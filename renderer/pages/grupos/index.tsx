import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { RiFilter2Line } from 'react-icons/ri';
import { TiPlus } from 'react-icons/ti';
import { AiOutlineEye, AiOutlineEdit, AiOutlineClose } from 'react-icons/ai';

import HeaderList from '../../components/utils/HeaderList'
import CardList from '../../components/utils/CardList'
import CardListNode from '../../components/utils/CardListNode'
import CardListActions from '../../components/utils/CardListActions'
import Btn from '../../components/utils/Btn'
import BtnIconCard from '../../components/utils/BtnIconCard'
import Modal from '../../components/utils/Modal'


function Grupos() {

  const [grupos] = useState([
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
    console.log('😁 Pegando grupos')
  }, [])

  return (
    <>
      <Head>
        <title>👨‍👩‍👦‍👦 Grupos</title>
      </Head>
      <main className="mt-4 mb-4">
        <HeaderList title="Grupos" >
          <Btn action={() => { setModalFilter(true) }} iconOnly>
            <RiFilter2Line />
          </Btn>
          <Btn action={() => { setModalInsert(true) }} iconOnly>
            <TiPlus />
          </Btn>
        </HeaderList>
        {grupos.map(grupo =>
          <CardList key={`${grupo.title}`} title={`${grupo.title}`}>
            <CardListNode col="col-12 col-md-4" field="Utilidade" value={`${grupo.utility}`} />
            <CardListActions>
              <Btn action={() => { setModalViewer(true) }} iconOnly noStyle>
                <BtnIconCard>
                  <AiOutlineEye />
                </BtnIconCard>
              </Btn>
              <Btn action={() => { setModalEdit(true) }} iconOnly noStyle>
                <BtnIconCard>
                  <AiOutlineEdit />
                </BtnIconCard>
              </Btn>
              <Btn action={() => { console.log('😎 Excluir grupo') }} iconOnly noStyle>
                <BtnIconCard>
                  <AiOutlineClose />
                </BtnIconCard>
              </Btn>
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

export default Grupos