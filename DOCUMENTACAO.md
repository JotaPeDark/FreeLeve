# Documentação do Projeto FreeLeve

## Visão Geral
O **FreeLeve** é um sistema de gestão para freelancers e clientes, permitindo o controle de projetos, atividades, horas trabalhadas e pagamentos via PIX.

## Requisitos Atendidos
1.  **Protocolo REST**: Implementado em todos os módulos do backend (NestJS).
2.  **Linguagem**: Backend em TypeScript (NestJS) e Frontend em JavaScript (React).
3.  **Integração**: Comunicação total via Axios e Proxy.
4.  **WebSocket**: Implementado no módulo de **Horas** (Timer) para atualizações em tempo real, com persistência no banco de dados.
5.  **Banco de Dados Relacional**: PostgreSQL (configurado via Docker e TypeORM).
6.  **Modelo de Dados**: 6 entidades principais:
    *   Freelancer
    *   Cliente
    *   Projeto
    *   Atividade
    *   Hora (Trabalhada)
    *   Pagamento
7.  **Requisitos Funcionais**:
    *   Gestão de Freelancers e Clientes.
    *   Criação e acompanhamento de Projetos.
    *   Divisão de projetos em Atividades.
    *   Timer em tempo real via WebSocket para registro de horas.
    *   Geração de pagamentos PIX integrados ao Mercado Pago.
8.  **Relacionamentos**:
    *   **1:N**: Freelancer -> Clientes, Cliente -> Projetos, Projeto -> Atividades, Atividade -> Horas.
    *   **N:N**: Implementado logicamente através da relação entre Freelancers e Atividades via entidade de Horas.
9.  **Integração PIX**: Integrado via SDK oficial do **Mercado Pago**.

## Como Executar (Deploy/Local)
O projeto está pronto para deploy via Docker.

### Pré-requisitos
*   Docker e Docker Compose instalados.

### Passos
1.  Na raiz do projeto, execute:
    ```bash
    docker-compose up --build
    ```
2.  O Frontend estará disponível em `http://localhost`.
3.  O Backend estará disponível em `http://localhost:3000`.

## Melhorias Realizadas
*   **Integração PIX**: Adicionado suporte ao Mercado Pago SDK v2.
*   **QR Code**: O frontend agora exibe o QR Code e o código "Copia e Cola" para pagamentos pendentes.
*   **Dockerização**: Criação de Dockerfiles e Docker Compose para facilitar o deploy.
*   **WebSocket**: Ajustes no Gateway para garantir a persistência correta das horas.
*   **Variáveis de Ambiente**: Configuração centralizada via `.env`.
