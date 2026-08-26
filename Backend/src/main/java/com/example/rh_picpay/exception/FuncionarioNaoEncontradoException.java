package com.example.rh_picpay.exception;

public class FuncionarioNaoEncontradoException extends RuntimeException {

    public FuncionarioNaoEncontradoException(String mensagem) {
        super(mensagem);
    }
}