import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { RiFilter2Line } from 'react-icons/ri';
import { TiPlus } from 'react-icons/ti';
import { AiOutlineEye, AiOutlineEdit, AiOutlineClose } from 'react-icons/ai';

import HeaderList from '../../components/utils/headerlist'
import CardList from '../../components/cards/list'
import CardListNode from '../../components/cards/list/nodes'
import CardListActions from '../../components/cards/list/actions'
import Button from '../../components/utils/button'
import BtnIconCard from '../../components/cards/list/buttonicon'
import Modal from '../../components/utils/modal'

import EmploeeForm from '../../components/forms/employee'

function Funcionarios() {

  const [funcionarios] = useState([
    { title: 'Administradores', utility: "Comandar a parada toda" },
    { title: 'Administradores 2', utility: "Comandar a parada toda" },
    { title: 'Administradores 3', utility: "Comandar a parada toda" },
    { title: 'Administradores 4', utility: "Comandar a parada toda" },
  ])

  const [modalEdit, setModalEdit] = useState(false)
  const [modalInsert, setModalInsert] = useState(false)
  const [modalViewer, setModalViewer] = useState(false)
  const [modalFilter, setModalFilter] = useState(false)

  useEffect(() => {
    console.log('😁 Pegando funcionarios')
  }, [])

  return (
    <>
      <Head>
        <title>Funcionarios</title>
      </Head>
      <main>

        <HeaderList title="Funcionarios" >
          <Button
            title="Filtro"
            action={() => { setModalFilter(true) }}
            iconOnly
          >
            <RiFilter2Line />
          </Button>
          <Button
            title="Adicionar Funcionario"
            action={() => { setModalInsert(true) }}
            iconOnly
          >
            <TiPlus />
          </Button>
        </HeaderList>
        {funcionarios.map(funcionario =>
          <CardList key={`${funcionario.title}`} title={`${funcionario.title}`}>
            <CardListNode col="col-xs-12 col-md-4" field="Utilidade" value={`${funcionario.utility}`} />
            <CardListActions>
              <Button
                title="Visualizar item"
                action={() => { setModalViewer(true) }}
                iconOnly
                noStyle
              >
                <BtnIconCard>
                  <AiOutlineEye />
                </BtnIconCard>
              </Button>
              <Button
                title="Editar funcionario"
                action={() => { setModalEdit(true) }}
                iconOnly
                noStyle
              >
                <BtnIconCard>
                  <AiOutlineEdit />
                </BtnIconCard>
              </Button>
              <Button
                title="Excluir funcionario"
                action={() => { console.log('😎 Excluir funcionario') }}
                iconOnly
                noStyle
              >
                <BtnIconCard>
                  <AiOutlineClose />
                </BtnIconCard>
              </Button>
            </CardListActions>
          </CardList>
        )}
      </main>

      <Modal open={modalInsert} setClose={() => setModalInsert(!modalInsert)}  >
        <EmploeeForm />
      </Modal>
      <Modal open={modalEdit} setClose={() => setModalEdit(!modalEdit)}  >
        <EmploeeForm
          nome="Marcon Tado"
          email="marcontado@gmail.com"
          endereco="Rua Secreta"
          cidade="Alvorada"
          estado="Rio Grande Do Sul"
          telefone="96969-6969"
        />
      </Modal>
      <Modal open={modalViewer} setClose={() => setModalViewer(!modalViewer)}  >
        VIEW
      </Modal>
      <Modal open={modalFilter} setClose={() => setModalFilter(!modalFilter)}  >
        Filter
      </Modal>

    </>
  )
}

export default Funcionarios