package com.example.rh_picpay.service;

import org.springframework.stereotype.Service;

import com.example.rh_picpay.entity.Funcionario;
import com.example.rh_picpay.enums.StatusFuncionario;
import com.example.rh_picpay.exception.CampoObrigatorioException;
import com.example.rh_picpay.exception.FuncionarioNaoEncontradoException;
import com.example.rh_picpay.exception.IdJaCadastradoException;
import com.example.rh_picpay.dtos.IndicadoresDTO;
import java.util.ArrayList;

@Service
public class FuncionarioService {

    private ArrayList<Funcionario> funcionarios = new ArrayList<>();

    // POST - Cadastrar funcionário
    public Funcionario cadastrar(Funcionario funcionario) {

        // Verificar se o ID já existe
        for (Funcionario f : funcionarios) {

            if (f.getId().equals(funcionario.getId())) {
                throw new IdJaCadastradoException("ID já cadastrado");
            }
        }

        // Verificar nome
        if (funcionario.getNome() == null || funcionario.getNome().isBlank()) {
            throw new CampoObrigatorioException("Nome é obrigatório");
        }

        // Verificar e-mail
        if (funcionario.getEmail() == null || funcionario.getEmail().isBlank()) {
            throw new CampoObrigatorioException("E-mail é obrigatório");
        }

        // Verificar cargo
        if (funcionario.getCargo() == null || funcionario.getCargo().isBlank()) {
            throw new CampoObrigatorioException("Cargo é obrigatório");
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

        throw new FuncionarioNaoEncontradoException("Funcionário não encontrado");
    }

    // GET - Buscar por nome, cargo e status
    public ArrayList<Funcionario> buscar(
            String nome,
            String cargo,
            StatusFuncionario status) {

        ArrayList<Funcionario> resultado = new ArrayList<>();

        for (Funcionario funcionario : funcionarios) {

            boolean corresponde = true;

            if (nome != null) {
                corresponde = corresponde &&
                        funcionario.getNome().toLowerCase()
                                .contains(nome.toLowerCase());
            }

            if (cargo != null) {
                corresponde = corresponde &&
                        funcionario.getCargo().toLowerCase()
                                .contains(cargo.toLowerCase());
            }

            if (status != null) {
                corresponde = corresponde &&
                        funcionario.getStatus() == status;
            }

            if (corresponde) {
                resultado.add(funcionario);
            }
        }

        return resultado;
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

        throw new FuncionarioNaoEncontradoException("Funcionário não encontrado");
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

        throw new FuncionarioNaoEncontradoException("Funcionário não encontrado");
    }

    // DELETE - Excluir funcionário
    public void excluir(Long id) {

        Funcionario funcionarioEncontrado = null;

        for (Funcionario funcionario : funcionarios) {

            if (funcionario.getId().equals(id)) {
                funcionarioEncontrado = funcionario;
                break;
            }
        }

        if (funcionarioEncontrado == null) {
            throw new FuncionarioNaoEncontradoException("Funcionário não encontrado");
        }

        funcionarios.remove(funcionarioEncontrado);
    }

    public IndicadoresDTO indicadores() {

        int total = funcionarios.size();
        int emAnalise = 0;
        int aprovados = 0;
        int reprovados = 0;
        int contratados = 0;

        for (Funcionario funcionario : funcionarios) {

            if (funcionario.getStatus() == StatusFuncionario.EM_ANALISE) {
                emAnalise++;
            }

            if (funcionario.getStatus() == StatusFuncionario.APROVADO) {
                aprovados++;
            }

            if (funcionario.getStatus() == StatusFuncionario.REPROVADO) {
                reprovados++;
            }

            if (funcionario.getStatus() == StatusFuncionario.CONTRATADO) {
                contratados++;
            }
        }

        return new IndicadoresDTO(
                total,
                emAnalise,
                aprovados,
                reprovados,
                contratados);
    }
}
