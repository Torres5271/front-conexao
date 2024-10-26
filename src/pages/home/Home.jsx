import React, { useEffect, useRef } from "react";
import styles from "./Home.module.css";
import Titulo from "../../components/titulo/Titulo";
import Navbar from "../../components/navbar/Navbar";
import imgInicio from "../../utils/assets/img_inicio.png";
import Footer from "../../components/footer/Footer";
import Button from "../../components/button/Button";
import imgBeneficios1 from "../../utils/assets/beneficios_1.png";
import imgBeneficios2 from "../../utils/assets/beneficios_2.png";
import imgBeneficios3 from "../../utils/assets/beneficios_3.png";
import CardBeneficios from './../../components/card-beneficios/CardBeneficios';
import CardPrecos from './../../components/card-precos/CardPrecos';
import CarouselProduto from './../../components/carousel-produto/CarouselProduto';
import { useNavigate } from "react-router-dom";

const Home = () => {
  sessionStorage.clear();
  const navigate = useNavigate();
  const secao = sessionStorage.getItem("secao");
  const sectionInicio = useRef();
  const sectionProduto = useRef();
  const sectionBeneficios = useRef();
  const sectionPrecos = useRef();

  const irParaInicio = () => sectionInicio.current.scrollIntoView();
  const irParaProduto = () => sectionProduto.current.scrollIntoView();
  const irParaBeneficios = () => sectionBeneficios.current.scrollIntoView();
  const irParaPrecos = () => sectionPrecos.current.scrollIntoView();

  useEffect(() => {
    if (secao) {
      switch (secao) {
        case "produto":
          irParaProduto();
          break;
        case "beneficios":
          irParaBeneficios();
          break;
        case "precos":
          irParaPrecos();
          break;
        default:
          irParaInicio();
          break;
      }
    }
  });

  return (
    <>
      <div className={styles["page-home"]}>
        <Navbar
          irParaInicio={irParaInicio}
          irParaProduto={irParaProduto}
          irParaBeneficios={irParaBeneficios}
          irParaPrecos={irParaPrecos}
        />
        <section className={styles["section-inicio"]} ref={sectionInicio}>
          <div className={styles["container-inicio"]}>
            <div className={styles["text"]}>
              <h1 className={styles["title"]}>
                Organizando seu <br />
                negócio, sempre <br />
                que <span className={styles["title-roxo"]}> você </span> quiser
              </h1>
              <div className={styles["button"]}>
                <Button titulo="Começar" cor="roxo" funcaoButton={() => navigate("/cadastro")} />
              </div>
            </div>
            <div className={styles["image"]}>
              <img src={imgInicio} alt="Ilustração mulher realizando agendamento" className={styles["img-inicio"]} />
            </div>
          </div>
        </section>
        <section className={styles["section-produto"]} ref={sectionProduto}>
          <div className={styles["container-produto"]}>
            <Titulo tamanho="lg" titulo="Produto" />
            <div className="carousel">
              <CarouselProduto />
            </div>
          </div>
        </section>
        <section className={styles["section-beneficios"]} ref={sectionBeneficios}>
          <div className={styles["beneficios"]}>
            <Titulo tamanho="lg" titulo="Benefícios" />
            <div className={styles["container-cards"]}>

              <CardBeneficios
                titulo="Atendimentos Otimizados"
                imagem={imgBeneficios1}
                texto="Gerenciar os agendamentos e otimizar tempo e recursos, aumentando a produtividade e o alcance de objetivos."
              />

              <CardBeneficios
                titulo={"Controle e Gestão de Finanças"}
                imagem={imgBeneficios2}
                texto="Gerenciar o fluxo de receitas e despesas de forma eficiente na mesma ferramenta para alcançar objetivos financeiros."
              />
              <CardBeneficios
                titulo="Organização dos Atendimentos"
                imagem={imgBeneficios3}
                texto="
                Gerenciar o fluxo de clientes de forma eficiente, otimizando o tempo e melhorando a experiência do cliente."
              />
            </div>
          </div>
          {/* <div className={styles["tecnologias"]}>
            <Titulo tamanho="lg" titulo="Tecnologias Utilizadas" />
            <div className={styles["container-cards"]}>
              <div className={styles["card-tecnologias"]}>
                <div className={styles["icon"]}>
                  <SiGooglecalendar />
                </div>
                <span className={styles["card-title"]}>
                  Google Calendar
                </span>
              </div>
              <div className={styles["card-tecnologias"]}>
                <div className={styles["icon"]}>
                  <FaReact />
                </div>
                <span className={styles["card-title"]}>
                  React
                </span>
              </div>
              <div className={styles["card-tecnologias"]}>
                <div className={styles["icon"]}>
                  <SiSpring />
                </div>
                <span className={styles["card-title"]}>
                  Spring Boot
                </span>
              </div>
              <div className={styles["card-tecnologias"]}>
                <div className={styles["icon"]}>
                  <SiMicrosoftsqlserver />
                </div>
                <span className={styles["card-title"]}>
                  MS SQL Server
                </span>
              </div>

            </div>
          </div> */}
        </section>
        <section className={styles["section-precos"]} ref={sectionPrecos}>
          <Titulo tamanho="lg" titulo="Preços" />
          <div className={styles["container-precos"]}>
            <CardPrecos
              classe="branco"
              nome="Plano Mensal"
              texto="A escolha perfeita para aquele que mora sozinho."
              preco="39,99"
              periodo="mês"
              vantagem1="XXXXXX"
              vantagem2="XXXXXX"
              vantagem3="XXXXXX"
              vantagem4="XXXXXX"
            />
            <CardPrecos
              classe="preto"
              nome="Plano Trimestral"
              texto="A escolha perfeita para aquele que mora sozinho."
              preco="99,99"
              periodo="trimestre"
              vantagem1="XXXXXX"
              vantagem2="XXXXXX"
              vantagem3="XXXXXX"
              vantagem4="XXXXXX"
            />
            <CardPrecos
              classe="branco"
              nome="Plano Anual"
              texto="A escolha perfeita para aquele que mora sozinho."
              preco="459,99"
              periodo="ano"
              vantagem1="XXXXXX"
              vantagem2="XXXXXX"
              vantagem3="XXXXXX"
              vantagem4="XXXXXX"
            />
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Home;