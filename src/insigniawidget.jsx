/* global ZOHO */
import { useEffect, useState } from "react";

const insignias = {
  "Aprendiz del agua": {
    img: "https://workdrive.zohoexternal.com/file/eufifceb4a78a83974f8482ea90a506fe1ab8",
    frase: "💧 ¡Estás dando tus primeros pasos para proteger el agua!",
  },
  "Defensor hídrico": {
    img: "https://workdrive.zohoexternal.com/file/eufifb7e31bdbde7a4b53bbb1c7779197687a",
    frase: "🌱 ¡Muy bien! Estás marcando una gran diferencia.",
  },
  "Guardián del agua": {
    img: "https://workdrive.zohoexternal.com/file/eufif775cd6f4392e4c56a0607111c6f30f1a",
    frase: "🌊 ¡Eres un ejemplo a seguir en tu comunidad!",
  },
};

export default function InsigniaWidget() {
  const [insignia, setInsignia] = useState(null);
  const [estado, setEstado] = useState("Cargando insignia...");

  useEffect(() => {
    ZOHO.CREATOR.init().then(() => {
      const fecha = new Date();
      const mes = fecha.getMonth() + 1;
      const year = fecha.getFullYear();

      ZOHO.CREATOR.API.getAllRecords({
        report_name: "Auditor_a_Report", // Cambia por el nombre real del informe publicado
        criteria: `(month(Added_Time) == ${mes}) && (year(Added_Time) == ${year})`,
        page: 1,
        pageSize: 1,
      }).then((response) => {
        const registro = response.data?.[0];
        if (registro?.Insignia_mes) {
          const data = insignias[registro.Insignia_mes];
          if (data) {
            setInsignia(data);
          } else {
            setEstado("Insignia desconocida.");
          }
        } else {
          setEstado("No se encontró una auditoría para este mes.");
        }
      }).catch((error) => {
        console.error("Error al consultar Zoho:", error);
        setEstado("Error al cargar los datos.");
      });
    });
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Tu insignia del mes</h2>
      {insignia ? (
        <>
          <img
            src={insignia.img}
            alt="Insignia"
            style={{ width: "120px", borderRadius: "12px", marginTop: "10px" }}
          />
          <p style={{ marginTop: "12px", fontSize: "1.2rem" }}>{insignia.frase}</p>
        </>
      ) : (
        <p style={{ fontSize: "1.1rem", marginTop: "20px" }}>{estado}</p>
      )}
    </div>
  );
}
