//=====Importaciones de React ====
import React, { useEffect, useState, useRef } from "react";

//=====Importaciones de estilos ====
import styles from "./styles.module.css";

//=====Importaciones de componentes generales ====
import Table from "../TableProducts/TableProducts";
import ShowPatient from "../ShowProducts/ShowProducts";

//=====Importaciones de componentes PrimeReact ====
import { Button } from "primereact/button";
import { Chart } from "primereact/chart";
import { Dropdown } from "primereact/dropdown";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

//=====Importaciones de hooks ====
import { useAdminProducts } from "hooks/AdminHooks/ProductsHooks/useAdminProducts";
import { useAdminOneProduct } from "hooks/AdminHooks/ProductsHooks/useAdminOneProduct";

//=====Importaciones de imagenes ====
import icon_dependencie_settings from "./images/icon_show_dep.png";
import ShowProducts from "../ShowProducts/ShowProducts";

export default function ShowProductsReports({ onClose }) {
  const [report, setReport] = useState();
  const [product, setProduct] = useState();
  const { products, headers } = useAdminProducts();

  /*States de los reportes */
  const [noReport, setNoReport] = useState(true);
  const [first, setFirst] = useState(false);
  const [second, setSecond] = useState(false);
  const [third, setThird] = useState(false);
  const [fourth, setFourth] = useState(false);
  const [fifth, setFifth] = useState(false);
  const [fifthData, setFifthData] = useState(false);

  /*States auxiliares de los reportes*/
  const [presentationProducts, setPresentationProducts] = useState();
  const [measurementProducts, setMeasurementProducts] = useState();
  const [typeProducts, setTypeProducts] = useState();

  const [childModal, setchildModal] = useState(<></>);
  const [showModal, setShowModal] = useState(false);

  const [chartData, setChart] = useState();
  const [charPresentation, setChartPresentation] = useState();
  const [charMeasurementUnit, setChartMeasurementUnit] = useState();
  const [charType, setChartType] = useState();

  const [lightOptions] = useState({
    plugins: {
      legend: {
        labels: {
          color: "#495057",
        },
      },
    },
  });
  const toast = useRef(null);

  function productsByPresentation() {
    let dataFormated = [];
    let unit = 0,
      box = 0,
      packageNumber = 0,
      blister = 0,
      jars = 0,
      mililiters = 0,
      pounds = 0,
      ounces = 0,
      kilograms = 0,
      grams = 0,
      gallon = 0;

    for (let i = 0; i < products.length; i++) {
      switch (products[i].presentation) {
        case "Unidad":
          unit++;
          break;
        case "Caja":
          box++;
          break;
        case "Paquete":
          packageNumber++;
          break;
        case "Ampolla":
          blister++;
          break;
        case "Frasco":
          jars++;
          break;
        case "Mililitros":
          mililiters++;
          break;
        case "Libra":
          pounds++;
          break;
        case "Onzas":
          ounces++;
          break;
        case "Kilogramos":
          kilograms++;
          break;
        case "Gramos":
          grams++;
          break;
        case "Galón":
          gallon++;
          break;
      }
    }

    console.log("Las unidades son : ");
    console.log(unit);
    console.log(box);

    let reportData = {
      units: unit,
      box: box,
      packageNumber: packageNumber,
      blister: blister,
      jars: jars,
      mililiters: mililiters,
      pounds: pounds,
      ounces: ounces,
      kilograms: kilograms,
      grams: grams,
      gallon: gallon,
    };

    dataFormated.push(reportData);

    setChartPresentation({
      labels: [
        "Unidades",
        "Cajas",
        "Paquetes",
        "Ampollas",
        "Frascos",
        "Mililitros",
        "Libras",
        "Onzas",
        "Kilogramos",
        "Gramos",
        "Galones",
      ],
      datasets: [
        {
          data: [
            unit,
            box,
            packageNumber,
            blister,
            jars,
            mililiters,
            pounds,
            ounces,
            kilograms,
            grams,
            gallon,
          ],
          backgroundColor: [
            "#42A5F5",
            "#66BB6A",
            "#FFA726",
            "#A01EA1",
            "#196D10",
            "#283DCC",
            "#B61D58",
            "#75A013",
            "#0D6A43",
            "#9C9212",
            "#4E17A5",
          ],
          hoverBackgroundColor: [
            "#64B5F6",
            "#81C784",
            "#FFB74D",
            "#B861B9",
            "#66B75D",
            "#616DC1",
            "#CB648C",
            "#8BA64D",
            "#65AB8E",
            "#B2AB51",
            "#78609D",
          ],
        },
      ],
    });
    setPresentationProducts(dataFormated);
    return dataFormated;
  }

  function productsByMesarumentUnit() {
    let dataFormated = [];
    let unit = 0,
      mililiters = 0,
      pounds = 0,
      ounces = 0,
      kilograms = 0,
      grams = 0,
      gallon = 0;

    for (let i = 0; i < products.length; i++) {
      switch (products[i].measurement_units) {
        case "Unidad":
          unit++;
          break;
        case "Mililitros":
          mililiters++;
          break;
        case "Libra":
          pounds++;
          break;
        case "Onzas":
          ounces++;
          break;
        case "Kilogramos":
          kilograms++;
          break;
        case "Gramos":
          grams++;
          break;
        case "Galón":
          gallon++;
          break;
      }
    }
    let reportData = {
      units: unit,
      mililiters: mililiters,
      pounds: pounds,
      ounces: ounces,
      kilograms: kilograms,
      grams: grams,
      gallon: gallon,
    };

    dataFormated.push(reportData);

    setChartMeasurementUnit({
      labels: [
        "Unidad",
        "Mililitros",
        "Libras",
        "Onzas",
        "Kilogramos",
        "Gramos",
        "Galones",
      ],
      datasets: [
        {
          data: [unit, mililiters, pounds, ounces, kilograms, grams, gallon],
          backgroundColor: [
            "#42A5F5",
            "#66BB6A",
            "#FFA726",
            "#A01EA1",
            "#196D10",
            "#283DCC",
            "#B61D58",
          ],
          hoverBackgroundColor: [
            "#64B5F6",
            "#81C784",
            "#FFB74D",
            "#B861B9",
            "#66B75D",
            "#616DC1",
            "#CB648C",
          ],
        },
      ],
    });
    setMeasurementProducts(dataFormated);
    return dataFormated;
  }

  function productsByType() {
    let dataFormated = [];
    let unit = 0,
      box = 0,
      packageNumber = 0,
      blister = 0,
      jars = 0,
      mililiters = 0;

    console.log("El arreglo de productos es ");
    console.log(products);
    for (let i = 0; i < products.length; i++) {
      switch (products[i].type_product) {
        case "Laboratorio":
          unit++;
          break;
        case "Elementos de Aseo":
          box++;
          break;
        case "Elementos Hospitalarios":
          packageNumber++;
          break;
        case "Elementos Generales":
          blister++;
          break;
        case "Medicamentos Generales":
          jars++;
          break;
        case "Médico - Quirurjicos":
          mililiters++;
          break;
      }
    }

    let reportData = {
      units: unit,
      box: box,
      packageNumber: packageNumber,
      blister: blister,
      jars: jars,
      mililiters: mililiters,
    };

    dataFormated.push(reportData);

    setChartType({
      labels: [
        "Laboratorio",
        "Elementos de aseo",
        "Elementos hospitalarios",
        "Elementos Generales",
        "Medicamentos Generales",
        "Médico - Quirurjicos",
      ],
      datasets: [
        {
          data: [unit, box, packageNumber, blister, jars, mililiters],
          backgroundColor: [
            "#42A5F5",
            "#66BB6A",
            "#FFA726",
            "#A01EA1",
            "#196D10",
            "#283DCC",
          ],
          hoverBackgroundColor: [
            "#64B5F6",
            "#81C784",
            "#FFB74D",
            "#B861B9",
            "#66B75D",
            "#616DC1",
          ],
        },
      ],
    });
    setTypeProducts(dataFormated);
    return dataFormated;
  }
  const reportsSelect = [
    { label: "Datos de todos los productos de la clínica", value: "UL" },
    { label: "Cantidad de productos por presentación", value: "SU" },
    { label: "Cantidad de productos por Unidad de medida", value: "PM" },
    { label: "Cantidad de productos por tipo", value: "PT" },
    { label: "Especificación de un producto", value: "PE" },
  ];

  useEffect(() => {
    if (report == "UL" && products != undefined) {
      setFirst(true);
      setSecond(false);
      setThird(false);
      setFourth(false);
      setFifth(false);
      setFifthData(false);
      setNoReport(false);
    } else if (report == "SU" && products != undefined) {
      productsByPresentation();
      setFirst(false);
      setSecond(true);
      setThird(false);
      setFourth(false);
      setFifth(false);
      setFifthData(false);
      setNoReport(false);
    } else if (report == "PM" && products != undefined) {
      productsByMesarumentUnit();
      setFirst(false);
      setSecond(false);
      setThird(true);
      setFourth(false);
      setFifth(false);
      setFifthData(false);
      setNoReport(false);
    } else if (report == "PT" && products != undefined) {
      productsByType();
      setFirst(false);
      setSecond(false);
      setThird(false);
      setFourth(true);
      setFifth(false);
      setFifthData(false);
      setNoReport(false);
    } else if (report == "PE" && products != undefined) {
      setFirst(false);
      setSecond(false);
      setThird(false);
      setFourth(false);
      setFifth(true);
      setFifthData(false);
      setNoReport(false);
    }
  }, [report]);

  useEffect(() => {
    if (fifth == true && product != undefined) {
      setFifthData(true);
    }
  }, [product, fifth]);

  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default(0, 0);
        doc.addFont("Inter");
        doc.setFont("Inter");
        doc.setFontSize(20);
        doc.text(50, 10, "Reporte de los usuarios de la clinica");
        doc.autoTable(exportColumns, products);
        doc.save("reporte_usuarios_clinica.pdf");
      });
    });
  };

  const handleChange = (event) => {
    let valueData = event.target.value;
    const patientData = JSON.parse(valueData);
    setFifthData(false);
    setProduct(patientData);
  };

  const cols = [
    { field: "tipoDoc", header: "Tipo de Documento" },
    { field: "document", header: "Identificación" },
    { field: "name", header: "Nombre" },
    { field: "professional_id", header: "Tarjeta Profesional" },
    { field: "rol", header: "Rol" },
  ];

  const exportColumns = cols.map((col) => ({
    title: col.header,
    dataKey: col.field,
  }));

  return (
    <>
      {showModal ? (
        <>{childModal}</>
      ) : (
        <div className={styles.form_add_user_general}>
          <>
            <div className={styles.title_image}>
              <img src={icon_dependencie_settings} width="50" height="50" />
              <h1> Reportes de Productos </h1>
            </div>
            <form className={styles.form_add_user}>
              <label
                className={styles.label_table_users}
                htmlFor="id_clinic_history"
              >
                Seleccione el reporte a generar
              </label>
              <Dropdown
                value={report}
                options={reportsSelect}
                onChange={(e) => setReport(e.value)}
                placeholder="Selecione un reporte"
              />

              {first && (
                <>
                  <label className={styles.label_table_users}>
                    Reporte generado
                  </label>
                  <div className="flex align-items-center export-buttons"></div>
                  <Button
                    type="button"
                    icon="pi pi-file-pdf"
                    onClick={exportPdf}
                    className={styles.button_generate_pdf}
                    data-pr-tooltip="PDF"
                  >
                    Generar Pdf
                  </Button>
                  <Table
                    headers={headers}
                    data={products}
                    isReport={true}
                  ></Table>
                </>
              )}
              {second && (
                <>
                  <label className={styles.label_table_users}>
                    Grafico generado - Cantidad de productos por presentación
                  </label>
                  <Chart
                    className={styles.graphic}
                    type="pie"
                    data={charPresentation}
                    options={lightOptions}
                    style={{ position: "relative", width: "40%" }}
                  />
                </>
              )}
              {third && (
                <>
                  <label className={styles.label_table_users}>
                    Grafico generado - Cantidad de productos por unidad de
                    medida
                  </label>
                  <Chart
                    className={styles.graphic}
                    type="pie"
                    data={charMeasurementUnit}
                    options={lightOptions}
                    style={{ position: "relative", width: "40%" }}
                  />
                </>
              )}
              {fourth && (
                <>
                  <label className={styles.label_table_users}>
                    Grafico generado - Cantidad de productos por tipo
                  </label>
                  <Chart
                    className={styles.graphic}
                    type="pie"
                    data={charType}
                    options={lightOptions}
                    style={{ position: "relative", width: "40%" }}
                  />
                </>
              )}
              {fifth && (
                <>
                  <label className={styles.label_table_users}>
                    Especificación de un producto
                  </label>
                  <label htmlFor="id_person">Seleccione el producto </label>
                  <select
                    className={styles.document_type}
                    onChange={handleChange}
                    required={true}
                  >
                    <option disabled={true} selected >Seleccione un producto</option>
                    {products.map((user) => (
                      <option
                        key={user.id_product + " " + user.presentation}
                        value={JSON.stringify(user)}
                      >
                        {user.id_product + " " + user.product_name + " " + user.presentation }
                      </option>
                    ))}
                  </select>
                </>
              )}

              {fifthData && (
                <>
                <ShowProducts dataProduct={product} isReport={true} />
                </>
              )}

              {noReport && (
                <h3 className={styles.no_selected_report}>
                  Aún no has seleccionado ningun reporte
                </h3>
              )}

              <div className={styles.form_horizontal}>
                <input
                  className={styles.button_accept}
                  type="submit"
                  onClick={onClose}
                  value="Salir de la vista de reportes"
                />
              </div>
            </form>
          </>
        </div>
      )}
    </>
  );
}
