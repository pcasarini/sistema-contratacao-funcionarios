package com.example.rh_picpay.service;

import org.springframework.stereotype.Service;

import com.example.rh_picpay.entity.Funcionario;

import java.util.ArrayList;

@Service
public class FuncionarioService {

    private ArrayList<Funcionario> funcionarios = new ArrayList<>();

    // POST - Cadastrar funcionário
    public Funcionario cadastrar(Funcionario funcionario) {

        // Verificar se o ID já existe
        for (Funcionario f : funcionarios) {

            if (f.getId().equals(funcionario.getId())) {
                throw new RuntimeException("ID já cadastrado");
            }
        }

        // Verificar nome
        if (funcionario.getNome() == null || funcionario.getNome().isBlank()) {
            throw new RuntimeException("Nome é obrigatório");
        }

        // Verificar e-mail
        if (funcionario.getEmail() == null || funcionario.getEmail().isBlank()) {
            throw new RuntimeException("E-mail é obrigatório");
        }

        // Verificar cargo
        if (funcionario.getCargo() == null || funcionario.getCargo().isBlank()) {
            throw new RuntimeException("Cargo é obrigatório");
        }

        // Adicionar funcionário na lista
        funcionarios.add(funcionario);

        // Retornar funcionário cadastrado
        return funcionario;
    }

    // GET - Listar todos
    public ArrayList<Funcionario> listarTodos() {
        return funcionarios;
    }

    // GET - Buscar por ID
    public Funcionario buscarPorId(Long id) {

        for (Funcionario funcionario : funcionarios) {

            if (funcionario.getId().equals(id)) {
                return funcionario;
            }
        }

        throw new RuntimeException("Funcionário não encontrado");
    }

    // PUT - Atualizar completamente
    public Funcionario atualizar(Long id, Funcionario funcionarioAtualizado) {

        for (Funcionario funcionario : funcionarios) {

            if (funcionario.getId().equals(id)) {

                funcionario.setNome(funcionarioAtualizado.getNome());
                funcionario.setEmail(funcionarioAtualizado.getEmail());
                funcionario.setTelefone(funcionarioAtualizado.getTelefone());
                funcionario.setCargo(funcionarioAtualizado.getCargo());
                funcionario.setDepartamento(funcionarioAtualizado.getDepartamento());
                funcionario.setSalario(funcionarioAtualizado.getSalario());
                funcionario.setCidade(funcionarioAtualizado.getCidade());
                funcionario.setStatus(funcionarioAtualizado.getStatus());

                return funcionario;
            }
        }

        throw new RuntimeException("Funcionário não encontrado");
    }

    // PATCH - Atualizar parcialmente
    public Funcionario atualizarParcialmente(Long id, Funcionario funcionarioAtualizado) {

        for (Funcionario funcionario : funcionarios) {

            if (funcionario.getId().equals(id)) {

                if (funcionarioAtualizado.getNome() != null) {
                    funcionario.setNome(funcionarioAtualizado.getNome());
                }

                if (funcionarioAtualizado.getEmail() != null) {
                    funcionario.setEmail(funcionarioAtualizado.getEmail());
                }

                if (funcionarioAtualizado.getTelefone() != null) {
                    funcionario.setTelefone(funcionarioAtualizado.getTelefone());
                }

                if (funcionarioAtualizado.getCargo() != null) {
                    funcionario.setCargo(funcionarioAtualizado.getCargo());
                }

                if (funcionarioAtualizado.getDepartamento() != null) {
                    funcionario.setDepartamento(funcionarioAtualizado.getDepartamento());
                }

                if (funcionarioAtualizado.getSalario() != null) {
                    funcionario.setSalario(funcionarioAtualizado.getSalario());
                }

                if (funcionarioAtualizado.getCidade() != null) {
                    funcionario.setCidade(funcionarioAtualizado.getCidade());
                }

                if (funcionarioAtualizado.getStatus() != null) {
                    funcionario.setStatus(funcionarioAtualizado.getStatus());
                }

                return funcionario;
            }
        }

        throw new RuntimeException("Funcionário não encontrado");
    }

// DELETE - Excluir funcionário
public void excluir(Long id) {

    for (Funcionario funcionario : funcionarios) {

        if (funcionario.getId().equals(id)) {

            funcionarios.remove(funcionario);
            return;
        }
    }

    throw new RuntimeException("Funcionário não encontrado");
}
}
