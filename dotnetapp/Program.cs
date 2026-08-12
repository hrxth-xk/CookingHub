using System;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;
using dotnetapp.Data;
using dotnetapp.Models;
using dotnetapp.Services;

var builder = WebApplication.CreateBuilder(args);

var jwtSecret = builder.Configuration["JWT:Secret"];
if (string.IsNullOrWhiteSpace(jwtSecret))
{
    throw new InvalidOperationException("JWT:Secret is missing. Set it in appsettings or environment variables.");
}

var jwtIssuer = builder.Configuration["JWT:ValidIssuer"];
var jwtAudience = builder.Configuration["JWT:ValidAudience"];

// ============================================================
// 1. DATABASE CONFIGURATION
// ============================================================
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("con")));

// ============================================================
// 2. IDENTITY CONFIGURATION
// ============================================================
builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

// ============================================================
// 3. JWT AUTHENTICATION CONFIGURATION
//    Make sure appsettings.json contains:
//    "JWT": {
//       "ValidAudience": "...",
//       "ValidIssuer": "...",
//       "Secret": "a-strong-secret-key"
//    }
// ============================================================
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.SaveToken = true;
    options.RequireHttpsMetadata = false; // set true in production with HTTPS
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateIssuerSigningKey = true,
        ValidAudience = jwtAudience,
        ValidIssuer = jwtIssuer,
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(jwtSecret))
    };
});

// (Recommended) Authorization services
builder.Services.AddAuthorization();

// ============================================================
// 4. REGISTER SERVICES (Dependency Injection)
// ============================================================
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<CookingClassService>();
builder.Services.AddScoped<CookingClassRequestService>();
builder.Services.AddScoped<FeedbackService>();

// ============================================================
// 5. CONTROLLERS & JSON
// ============================================================
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler =
        System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    options.JsonSerializerOptions.PropertyNamingPolicy = null;
    options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
});

builder.Services.AddEndpointsApiExplorer();

// ============================================================
// 6. SWAGGER (SWASHBUCKLE) WITH JWT BEARER
//    This adds the "Authorize" button and sends Authorization: Bearer <token>
// ============================================================
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Cooking Hub API",
        Version = "v1"
    });

    // Define the BearerAuth scheme
    var securityScheme = new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Description = "Paste your JWT token here (without the 'Bearer ' prefix).",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT"
    };

    c.AddSecurityDefinition("Bearer", securityScheme);
});

// ============================================================
// 7. CORS CONFIGURATION
// ============================================================
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// ============================================================
// 8. BUILD
// ============================================================
var app = builder.Build();

// ============================================================
// 9. MIDDLEWARE PIPELINE (ORDER MATTERS!)
// ============================================================
    app.UseSwagger();
    app.UseSwaggerUI();


// Remove or comment out HTTPS redirection for HTTP testing
// app.UseHttpsRedirection();

app.UseCors();

app.UseAuthentication();   // ← MUST come BEFORE UseAuthorization
app.UseAuthorization();

app.MapControllers();

app.Run();