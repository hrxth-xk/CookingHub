using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
namespace dotnetapp.Services
{
    [ApiController]
    [Route("api/[controller]")]
    public class CookingClassController : ControllerBase
    {
        private readonly CookingClassService _cookingClassService;
        public CookingClassController(CookingClassService cookingClassService)

        {
            _cookingClassService = cookingClassService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CookingClass>>> GetAllCookingClasses()
        {
            try
            {
                var classes = await _cookingClassService.GetAllCookingClasses();
                return Ok(classes);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }

        [HttpGet("{classId}")]
        public async Task<ActionResult<CookingClass>> GetCookingClassById(int classId)
        {
            try
            {
                var cookingClass = await _cookingClassService.GetCookingClassById(classId);
                if (cookingClass == null)
                    return NotFound("Cannot find any cooking class");
                return Ok(cookingClass);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize(Roles="User,Admin")]
        [HttpPost]
        public async Task<ActionResult> AddCookingClass([FromBody] CookingClass cooking)
        {
            try
            {
                var result = await _cookingClassService.AddCookingClass(cooking);
                if (result)
                    return Ok("Cooking class added successfully");
                return StatusCode(500, "Failed to add cooking class");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("{classId}")]
        public async Task<ActionResult> UpdateCookingClass(int classId, [FromBody] CookingClass cooking)
        {
            try
            {
                var result = await _cookingClassService.UpdateCookingClass(classId, cooking);
                if (!result)
                    return NotFound("Cannot find any cooking class");
                return Ok("Cooking class updated successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("{classId}")]
        public async Task<ActionResult> DeleteCookingClass(int classId)
        {
            try
            {
                var result = await _cookingClassService.DeleteCookingClass(classId);
                if (!result)
                    return NotFound("Cannot find any cooking class");
                return Ok("Cooking class deleted successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}



