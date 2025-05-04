using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Services;
using dotnetapp.Models;
using Microsoft.AspNetCore.Authorization;
using dotnetapp.Exceptions;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Authorize(Roles = "Admin,User")]
    [Route("api/room")]
    public class RoomController : ControllerBase
    {
        private readonly RoomService _roomService;
        public RoomController(RoomService roomService)
        {
            _roomService = roomService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Room>>> GetAllRooms()
        {
            try
            {
                var get = await _roomService.GetAllRooms();
                return Ok(get);
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("{roomId}")]
        public async Task<ActionResult<Room>> GetRoomById(int roomId)
        {
            try
            {
                var getById = await _roomService.GetRoomById(roomId);
                if (getById == null)
                {
                    return NotFound("Cannot find any room");
                }
                return Ok(getById);

            }
            catch (System.Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult> AddRoom([FromBody] Room room)
        {
            try
            {
                var result = await _roomService.AddRoom(room);
                if (!result)
                {
                    return StatusCode(500, new { status = "Error", message = "Failed to add room" });
                }
                return Ok(new { status = "Success", message = "Room added successfully" });
            }
            catch (RoomException ex)
            {
                return StatusCode(400, new { status = "Bad Request", ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { status = "Error", message = "An unexpected error occurred" });
            }
        }


        [HttpPut("{roomId}")]
        public async Task<ActionResult> UpdateRoom(int roomId, [FromBody] Room room)
        {
            try
            {
                if(roomId != room.RoomId)
                {
                    return BadRequest();
                }
                var getById = await _roomService.GetRoomById(roomId);
                if(getById == null)
                {
                    return NotFound("Cannot find any room");
                }
                var update = await _roomService.UpdateRoom(roomId, room);
                if (!update)
                {
                    return StatusCode(500, new { status = "Error", message = "Failed to add room" });
                }
                return Ok(new { status = "Success", message = "Room updated successfully" });
            }
            catch (RoomException ex)
            {
                return StatusCode(400, new { status = "Bad Request", ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { status = "Error", message = "An unexpected error occurred" });
            }
        }

        [HttpDelete("{roomId}")]
        public async Task<ActionResult> DeleteRoom(int roomId)
        {
            try
            {
                
                if(await _roomService.GetRoomById(roomId) == null)
                {
                    return NotFound("Cannot find any room");
                }
                await _roomService.DeleteRoom(roomId);
                return Ok(new { status = "Success", message = "Room deleted successfully" });
                
            }
            catch (RoomException ex)
            {
                return StatusCode(400, new { status = "Bad Request", ex.Message });
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}