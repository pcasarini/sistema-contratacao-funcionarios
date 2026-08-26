package com.example.rh_picpay.service;

import com.example.rh_picpay.model.Funcionario;
import org.springframework.stereotype.Service;

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

        return null;
    }

    // DELETE - Excluir
    public void excluir(Long id) {

    }
}
