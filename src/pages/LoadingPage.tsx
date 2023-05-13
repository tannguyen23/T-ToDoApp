import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d2d0dd;
  width: 100vw;
  height: 100vh;
`;

export default function LoadingPage() {
  return (
    <Container>
      <div>
        <div className="loadingio-spinner-blocks-rsps8122p3h">
          <div className="ldio-brqrckqu4m6">
            <div style={{ left: "38px", top: "38px", animationDelay: "0s" }} />
            <div
              style={{ left: "80px", top: "38px", animationDelay: "0.125s" }}
            />
            <div
              style={{ left: "122px", top: "38px", animationDelay: "0.25s" }}
            />
            <div
              style={{ left: "38px", top: "80px", animationDelay: "0.875s" }}
            />
            <div
              style={{ left: "122px", top: "80px", animationDelay: "0.375s" }}
            />
            <div
              style={{ left: "38px", top: "122px", animationDelay: "0.75s" }}
            />
            <div
              style={{ left: "80px", top: "122px", animationDelay: "0.625s" }}
            />
            <div
              style={{ left: "122px", top: "122px", animationDelay: "0.5s" }}
            />
          </div>
        </div>
        <style
          type="text/css"
          dangerouslySetInnerHTML={{
            __html:
              "\n@keyframes ldio-brqrckqu4m6 {\n  0% { background: #d2c7bd }\n  12.5% { background: #d2c7bd }\n  12.625% { background: #5b68e1 }\n  100% { background: #5b68e1 }\n}\n.ldio-brqrckqu4m6 div {\n  position: absolute;\n  width: 40px;\n  height: 40px;\n  background: #5b68e1;\n  animation: ldio-brqrckqu4m6 1s linear infinite;\n}\n.loadingio-spinner-blocks-rsps8122p3h {\n  width: 200px;\n  height: 200px;\n  display: inline-block;\n  overflow: hidden;}\n.ldio-brqrckqu4m6 {\n  width: 100%;\n  height: 100%;\n  position: relative;\n  transform: translateZ(0) scale(1);\n  backface-visibility: hidden;\n  transform-origin: 0 0; /* see note above */\n}\n.ldio-brqrckqu4m6 div { box-sizing: content-box; }\n\n",
          }}
        />
      </div>
    </Container>
  );
}
