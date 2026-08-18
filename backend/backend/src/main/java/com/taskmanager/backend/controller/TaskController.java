package com.taskmanager.backend.controller;


import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.taskmanager.backend.entity.Task;
import com.taskmanager.backend.repository.TaskRepository;



@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = {"http://localhost:5173", "https://taskflow-13.onrender.com"})
public class TaskController {


    private final TaskRepository taskRepository;


    public TaskController(TaskRepository taskRepository){

        this.taskRepository = taskRepository;
    }



    // CREATE
    @PostMapping
    public Task createTask(@RequestBody Task task){

        return taskRepository.save(task);
    }



    // READ ALL
    @GetMapping
    public List<Task> getAllTasks(){

        return taskRepository.findAll();
    }



    // READ ONE
    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable Long id){

        return taskRepository.findById(id)
                .orElse(null);
    }




    // UPDATE
    @PutMapping("/{id}")
    public Task updateTask(
            @PathVariable Long id,
            @RequestBody Task task){


        Task existingTask =
                taskRepository.findById(id)
                .orElse(null);


        if(existingTask != null){

            existingTask.setTitle(task.getTitle());
            existingTask.setDescription(task.getDescription());
            existingTask.setPriority(task.getPriority());
            existingTask.setStatus(task.getStatus());
            existingTask.setDueDate(task.getDueDate());


            return taskRepository.save(existingTask);
        }


        return null;
    }





    // DELETE
    @DeleteMapping("/{id}")
    public String deleteTask(@PathVariable Long id){

        taskRepository.deleteById(id);

        return "Task deleted successfully";
    }

}
