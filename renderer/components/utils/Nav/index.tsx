import React, { useState, useEffect } from "react";

// Icons import
import { TiGroupOutline, TiFlowChildren } from "react-icons/ti";
import { FiMenu } from "react-icons/fi";
import { GoGraph } from "react-icons/go";
import { AiOutlineUser, AiOutlineLock, AiOutlineAudit } from "react-icons/ai";
import { GiAxeInLog, GiExitDoor } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { FaUserGraduate, FaUserShield } from "react-icons/fa";
import Auth from "../../../helpers/Auth";

// Common Project libs
import Button from "../button";

// Style Module
import styles from "./nav.module.css";

function Nav() {
  const [menuActive, setMenuActive] = useState(false);
  const [links, setLinks] = useState([
    { title: "Pessoas" },
    { icone: <FaUserGraduate />, nome: "Funcionários", url: "/funcionarios" },
    { icone: <FaUserShield />, nome: "Clientes", url: "/clientes" },
    { title: "Work Flow" },
    { icone: <TiFlowChildren />, nome: "Processos", url: "/processos" },
    { title: "Administação" },
    { icone: <GoGraph />, nome: "Métricas", url: "/dashboard" },
    {
      icone: <TiGroupOutline />,
      nome: "Grupos",
      url: "/grupos",
      permissao: "administrador",
    },
    {
      icone: <AiOutlineUser />,
      nome: "Usuários",
      url: "/usuarios",
      permissao: "administrador",
    },
    {
      icone: <AiOutlineAudit />,
      nome: "Auditoria",
      url: "/auditoria",
      permissao: "administrador",
    },
    {
      icone: <AiOutlineLock />,
      nome: "Permissões",
      url: "/permissoes",
      permissao: "administrador",
    },
    { icone: <GiAxeInLog />, nome: "Logs", url: "/logs" },
    { title: " " },
    { icone: <GiExitDoor />, nome: "Sair", url: "/" },
  ]);

  function setMenuOpenWithWithSize() {
    setMenuActive(window.innerWidth >= 1740);
  }

  useEffect(() => {
    window.addEventListener("resize", function () {
      setMenuOpenWithWithSize();
    });
    setMenuOpenWithWithSize();
  }, []);

  return (
    <>
      <div className={`container-fluid ${styles.cont}`}>
        <div className="container">
          <nav className={styles.nav}>
            <ul className={styles.menu}>
              <li>
                <div className={styles.img}>
                  <Button title="Home" href="/dashboard" noStyle>
                    <div className={styles.seta}>
                      <img src="/icons/icon126t.png" alt="Site Logo" />
                    </div>
                  </Button>
                </div>
              </li>
            </ul>
            <ul className={styles.menu}>
              <Button title="Dashboard" href="/dashboard" noStyle>
                <GoGraph />
              </Button>
              <Button
                title="Abrir Menu"
                action={() => setMenuActive(!menuActive)}
                noStyle
              >
                <FiMenu />
              </Button>
            </ul>
          </nav>
          <div
            className={
              menuActive
                ? `${styles.contaside} ${styles.contasideativado}`
                : styles.contaside
            }
          >
            <div className={styles.contasidefix}>
              <div className={styles.headercont}>
                <p>Menu</p>
                <Button
                  title="Fechar Menu"
                  action={() => setMenuActive(!menuActive)}
                  noStyle
                >
                  <MdClose />
                </Button>
              </div>
              <div className={styles.cardmenu}>
                <div>
                  <img src="/icons/icon126t.png" />
                </div>
                <span>JOLI - Juridico Operacional Lindamente Implementado</span>
              </div>
              <div className={styles.menulist}>
                {Object.keys(links).map((key) =>
                  !links[key].permissao ? (
                    links[key].title ? (
                      <p className={styles.categoria}>{links[key].title}</p>
                    ) : (
                      <Button
                        title={links[key].nome}
                        href={`${links[key].url}`}
                        noStyle
                      >
                        <div
                          className={styles.menuitem}
                          aria-label="Calendar Button"
                        >
                          <span>{links[key].icone}</span>
                          <p>{links[key].nome}</p>
                        </div>
                      </Button>
                    )
                  ) : Auth.isAllow(links[key].permissao) ? (
                    links[key].title ? (
                      <p className={styles.categoria}>{links[key].title}</p>
                    ) : (
                      <Button
                        title={links[key].nome}
                        href={`${links[key].url}`}
                        noStyle
                      >
                        <div
                          className={styles.menuitem}
                          aria-label="Calendar Button"
                        >
                          <span>{links[key].icone}</span>
                          <p>{links[key].nome}</p>
                        </div>
                      </Button>
                    )
                  ) : (
                    ""
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Nav;
