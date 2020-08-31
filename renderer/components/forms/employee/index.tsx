import React, { useState, useEffect } from 'react'

import Input from '../../utils/input'
import Select from '../../utils/select'

import IBGEHelper from '../../../helpers/IBGEHelper'

type EmployeeFace = {
  nome?: string,
  email?: string,
  endereco?: string,
  telefone?: string,
  cidade?: string,
  estado?: string
  cidades?: Array<string>
  estados: Array<string>
}

function EmployeeForm(Employee: EmployeeFace) {

  const [cidades, setCidades] = useState<Array<string>>(Employee.cidades);
  const [estados, setEstados] = useState<Array<string>>(Employee.estados);
  const [nome, setNome] = useState<string>(Employee.nome);
  const [email, setEmail] = useState<string>(Employee.email);
  const [endereco, setEndereco] = useState<string>(Employee.endereco);
  const [telefone, setTelefone] = useState<string>(Employee.telefone);
  const [cidade, setCidade] = useState<string>(Employee.cidade);
  const [estado, setEstado] = useState<string>(Employee.estado);

  return (
    <>
      <div className="container-fluid">
        <div className="container">
          <div className="row">
            <div className="col-xs col-md-12">
              <Input
                title='Nome'
                name="nome"
                type="text"
                value={nome}
                onChange={() => { setNome(event.target.value) }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xs col-md-6">
              <Input
                title='Email'
                name="email"
                type="email"
                value={email}
                onChange={() => { setEmail(event.target.value) }}
              />
            </div>

            <div className="col-xs col-md-6">
              <Input
                title='Telefone'
                name="telefone"
                type="text"
                value={telefone}
                onChange={() => { setTelefone(event.target.value) }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xs col-md-12">
              <Input
                title='Endereço'
                name="endereco"
                type="text"
                value={endereco}
                onChange={() => { setEndereco(event.target.value) }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xs col-md-6">
              <Select
                name="Estados"
                items={estados}
                selected={estado}
                identify="estado"
              />
            </div>

            <div className="col-xs col-md-6">
              {cidades ?
                <Select
                  name="Cidade"
                  items={cidades}
                  selected={cidade}
                  identify="cidade"
                />
            : ''
            }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EmployeeForm