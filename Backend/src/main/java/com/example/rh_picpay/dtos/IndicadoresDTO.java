package com.example.rh_picpay.dtos;

public class IndicadoresDTO {

    private int total;
    private int emAnalise;
    private int aprovados;
    private int reprovados;
    private int contratados;

    public IndicadoresDTO(
            int total,
            int emAnalise,
            int aprovados,
            int reprovados,
            int contratados) {

        this.total = total;
        this.emAnalise = emAnalise;
        this.aprovados = aprovados;
        this.reprovados = reprovados;
        this.contratados = contratados;
    }

    public int getTotal() {
        return total;
    }

    public int getEmAnalise() {
        return emAnalise;
    }

    public int getAprovados() {
        return aprovados;
    }

    public int getReprovados() {
        return reprovados;
    }

    public int getContratados() {
        return contratados;
    }
}