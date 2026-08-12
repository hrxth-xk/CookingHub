using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace dotnetapp.Migrations
{
    /// <summary>
    /// Drops Users.Password. Registration was writing the submitted password into this
    /// profile table in cleartext, duplicating the credential that Identity already
    /// stores as a salted hash in AspNetUsers.PasswordHash. Nothing read this column —
    /// login authenticates through UserManager.CheckPasswordAsync — so dropping it
    /// changes no behaviour.
    /// </summary>
    public partial class RemovePlaintextPassword : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Password",
                table: "Users");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Recreated as nullable with no default: the original plaintext values are
            // gone and must never be reconstructed.
            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "Users",
                type: "character varying(255)",
                maxLength: 255,
                nullable: true);
        }
    }
}
