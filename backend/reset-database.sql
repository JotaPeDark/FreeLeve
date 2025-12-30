-- ============================================
-- SCRIPT DE RESET COMPLETO
-- Sistema Freelancer - SEM PIX
-- ============================================

-- Conectar ao banco
\c freelancer_db

-- Deletar todas as tabelas (ordem reversa por causa das FKs)
DROP TABLE IF EXISTS pagamentos CASCADE;
DROP TABLE IF EXISTS horas CASCADE;
DROP TABLE IF EXISTS atividades CASCADE;
DROP TABLE IF EXISTS projetos CASCADE;
DROP TABLE IF EXISTS clientes CASCADE;
DROP TABLE IF EXISTS freelancers CASCADE;

-- Recriar as tabelas (ordem correta)

-- 1. Freelancers (não tem FK)
CREATE TABLE freelancers (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    chave_pix VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Clientes (FK para freelancers)
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    freelancer_id INTEGER NOT NULL REFERENCES freelancers(id) ON DELETE CASCADE,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Projetos (FK para clientes)
CREATE TABLE projetos (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
    nome VARCHAR(255) NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pendente',
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Atividades (FK para projetos)
CREATE TABLE atividades (
    id SERIAL PRIMARY KEY,
    projeto_id INTEGER NOT NULL REFERENCES projetos(id) ON DELETE CASCADE,
    nome VARCHAR(255) NOT NULL,
    status VARCHAR(20) DEFAULT 'pendente',
    tempo_estimado INTEGER,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Horas (FK para atividades e freelancers)
CREATE TABLE horas (
    id SERIAL PRIMARY KEY,
    atividade_id INTEGER NOT NULL REFERENCES atividades(id) ON DELETE CASCADE,
    freelancer_id INTEGER NOT NULL REFERENCES freelancers(id) ON DELETE CASCADE,
    inicio TIMESTAMP NOT NULL,
    fim TIMESTAMP,
    tempo_total INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Pagamentos (FK para projetos) - SEM CAMPOS PIX
CREATE TABLE pagamentos (
    id SERIAL PRIMARY KEY,
    projeto_id INTEGER NOT NULL REFERENCES projetos(id) ON DELETE CASCADE,
    valor DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pendente',
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar índices para performance
CREATE INDEX idx_clientes_freelancer_id ON clientes(freelancer_id);
CREATE INDEX idx_projetos_cliente_id ON projetos(cliente_id);
CREATE INDEX idx_projetos_status ON projetos(status);
CREATE INDEX idx_atividades_projeto_id ON atividades(projeto_id);
CREATE INDEX idx_atividades_status ON atividades(status);
CREATE INDEX idx_horas_atividade_id ON horas(atividade_id);
CREATE INDEX idx_horas_freelancer_id ON horas(freelancer_id);
CREATE INDEX idx_horas_inicio ON horas(inicio);
CREATE INDEX idx_pagamentos_projeto_id ON pagamentos(projeto_id);
CREATE INDEX idx_pagamentos_status ON pagamentos(status);

-- Verificar estrutura
\d freelancers
\d clientes
\d projetos
\d atividades
\d horas
\d pagamentos

-- Verificar se está tudo vazio
SELECT 'freelancers' as tabela, COUNT(*) as total FROM freelancers
UNION ALL
SELECT 'clientes', COUNT(*) FROM clientes
UNION ALL
SELECT 'projetos', COUNT(*) FROM projetos
UNION ALL
SELECT 'atividades', COUNT(*) FROM atividades
UNION ALL
SELECT 'horas', COUNT(*) FROM horas
UNION ALL
SELECT 'pagamentos', COUNT(*) FROM pagamentos;

COMMIT;

SELECT '✅ Banco de dados resetado com sucesso! (SEM PIX)' as status;
