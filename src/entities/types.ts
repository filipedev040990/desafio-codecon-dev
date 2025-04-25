export type Equipe = {
  nome: string
  lider: boolean
  projetos: {
    nome: string
    concluido: boolean
  }[]
}

export type Log = {
  data: string
  acao: string
}

export type UserCommonData = {
  id: string
  nome: string
  idade: number
  score: number
  ativo: boolean
  pais: string
  equipe: Equipe
  logs: Log[]
}
