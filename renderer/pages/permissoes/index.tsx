import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { RiFilter2Line } from 'react-icons/ri';
import { TiPlus } from 'react-icons/ti';
import { AiOutlineEdit, AiOutlineClose } from 'react-icons/ai';

import HeaderList from '../../components/utils/headerlist'
import CardList from '../../components/cards/list'
import CardListNode from '../../components/cards/list/nodes'
import CardListActions from '../../components/cards/list/actions'
import Button from '../../components/utils/button'
import BtnIconCard from '../../components/cards/list/buttonicon'
import Modal from '../../components/utils/modal'


function Permissoes() {

  const [permissoes] = useState([
    {
      title: 'Categoria', acoes: {
        inserir: true,
        visualisar: true,
        editar: true,
        excluir: true,
      }
    },
    {
      title: 'Post', acoes: {
        inserir: false,
        visualisar: true,
        editar: false,
        desativar: true,
      }
    },
    {
      title: 'Grupos', acoes: {
        inserir: false,
        visualisar: true,
        editar: true,
        excluir: true,
        desativar: true,
      }
    },
  ])

  const [modalEdit, setModalEdit] = useState(false)
  const [modalInsert, setModalInsert] = useState(false)
  const [modalViewer, setModalViewer] = useState(false)
  const [modalFilter, setModalFilter] = useState(false)

  useEffect(() => {
    console.log('😁 Pegando permissoes')
  }, [])

  return (
    <>
      <Head>
        <title>🩲 Permissões</title>
      </Head>
      <main className="mt-4 mb-4">
        <HeaderList title="Permissões" >
          <Button
            title="Filtro"
            action={() => { setModalFilter(true) }}
            iconOnly
          >
            <RiFilter2Line />
          </Button>
          <Button
            title="Adicionar Parmissão"
            action={() => { setModalInsert(true) }}
            iconOnly
          >
            <TiPlus />
          </Button>
        </HeaderList>
        {permissoes.map(permissao =>
          <CardList key={`${permissao.title}`} title={`${permissao.title}`}>
            {Object.entries(permissao.acoes).map(([key, item]) =>
              < CardListNode
                col="col-12 col-md-3"
                field={`${key}`}
                value={item ? 'Ativo' : 'Inativo'}
                tag={item ? '#98ec65' : '#ff5555'} />
            )}
            <CardListActions>
              <Button
                title={`Editar permissão ${permissao.title}`}
                action={() => { setModalEdit(true) }}
                iconOnly
                noStyle
              >
                <BtnIconCard>
                  <AiOutlineEdit />
                </BtnIconCard>
              </Button>
              <Button
                title={`Excluir permissão ${permissao.title}`}
                action={() => { console.log('😎 Excluir Permissão') }}
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
        INSERT
      </Modal>
      <Modal open={modalEdit} setClose={() => setModalEdit(!modalEdit)}  >
        EDIT
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

export default Permissoes