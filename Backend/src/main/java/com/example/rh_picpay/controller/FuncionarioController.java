package com.example.rh_picpay.controller;

import com.example.rh_picpay.dtos.IndicadoresDTO;
import com.example.rh_picpay.entity.Funcionario;
import com.example.rh_picpay.service.FuncionarioService;

import org.springframework.web.bind.annotation.*;
import com.example.rh_picpay.enums.StatusFuncionario;

import java.util.ArrayList;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/funcionarios")
public class FuncionarioController {
    private FuncionarioService funcionarioService;

    public FuncionarioController(FuncionarioService funcionarioService) {
        this.funcionarioService = funcionarioService;
    }

    @PostMapping
    public Funcionario cadastrar(@RequestBody Funcionario funcionario) {

        return funcionarioService.cadastrar(funcionario);
    }

    @GetMapping
    public ArrayList<Funcionario> listarTodos() {

        return funcionarioService.listarTodos();
    }

    @GetMapping("/{id}")
    public Funcionario buscarPorId(@PathVariable Long id) {

        return funcionarioService.buscarPorId(id);
    }

    @GetMapping("/buscar")
    public ArrayList<Funcionario> buscar(
            @RequestParam(required = false) String nome,
            @RequestParam(required = false) String cargo,
            @RequestParam(required = false) StatusFuncionario status) {

        return funcionarioService.buscar(nome, cargo, status);
    }

    @PutMapping("/{id}")
    public Funcionario atualizar(
            @PathVariable Long id,
            @RequestBody Funcionario funcionario) {

        return funcionarioService.atualizar(id, funcionario);
    }

    @PatchMapping("/{id}")
    public Funcionario atualizarParcialmente(
            @PathVariable Long id,
            @RequestBody Funcionario funcionario) {

        return funcionarioService.atualizarParcialmente(id, funcionario);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {

        funcionarioService.excluir(id);
    }

    @GetMapping("/indicadores")
    public IndicadoresDTO indicadores() {

        return funcionarioService.indicadores();
    }
}
