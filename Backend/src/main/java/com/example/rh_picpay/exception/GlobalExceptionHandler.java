package com.example.rh_picpay.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(FuncionarioNaoEncontradoException.class)
    public ResponseEntity<String> funcionarioNaoEncontrado(
            FuncionarioNaoEncontradoException erro) {

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(erro.getMessage());
    }


    @ExceptionHandler(IdJaCadastradoException.class)
    public ResponseEntity<String> idJaCadastrado(
            IdJaCadastradoException erro) {

        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(erro.getMessage());
    }


    @ExceptionHandler(CampoObrigatorioException.class)
    public ResponseEntity<String> campoObrigatorio(
            CampoObrigatorioException erro) {

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(erro.getMessage());
    }


    // Status inválido enviado pelo JSON
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<String> statusInvalidoJson(
            HttpMessageNotReadableException erro) {

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body("Status inválido. Valores permitidos: EM_ANALISE, APROVADO, REPROVADO ou CONTRATADO");
    }


    // Status inválido enviado pela URL
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<String> statusInvalidoParametro(
            MethodArgumentTypeMismatchException erro) {

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body("Status inválido. Valores permitidos: EM_ANALISE, APROVADO, REPROVADO ou CONTRATADO");
    }
}