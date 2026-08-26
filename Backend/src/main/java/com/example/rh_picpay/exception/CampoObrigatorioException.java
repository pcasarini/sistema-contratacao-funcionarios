package com.example.rh_picpay.exception;

public class CampoObrigatorioException extends RuntimeException {

    public CampoObrigatorioException(String mensagem) {
        super(mensagem);
    }
}