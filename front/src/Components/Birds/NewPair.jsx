import React, { useState, useEffect } from "react";
import {
    Button,
    Card,
    Dialog,
    DialogActions,
    Divider,
    Grid,
    ListItem,
    Slide,
    Table,
    TextField,
    Tooltip,
} from "@material-ui/core";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ModalColor } from "./ModalColor";
import moment from "moment";
import { Add, Delete } from "@material-ui/icons";
import { ModalDeleteNewPuesta } from "./Modal/ModalDeleteNewPuesta";

export const NewPair = (props) => {
    const [numberPair, setNumberPair] = useState('');

    const [anillaMale, setAnillaMale] = useState("");
    const [yearMale, setYearMale] = useState(moment().format("DD/MM/YYYY"));
    const [colorMale, setColorMale] = useState([]);
    const [procedencyMale, setProcedencyMale] = useState("");
    const [notesMale, setNotesMale] = useState("");

    const [anillaFemale, setAnillaFemale] = useState("");
    const [yearFemale, setYearFemale] = useState(moment().format("DD/MM/YYYY"));
    const [colorFemale, setColorFemale] = useState([]);
    const [procedencyFemale, setProcedencyFemale] = useState("");
    const [notesFemale, setNotesFemale] = useState("");

    const [generalNotes, setGeneralNotes] = useState("");

    // random id
    const [objPuestasPareja, setObjPuestasPareja] = useState({
            id: Math.random().toString(36),
        },
    )
    const [arrPuestasPareja, setArrPuestasPareja] = useState([{
        id: Math.random().toString(36),
    }])

    const handleChangeMaleColor = (color) => {
        // set array of color hex
        setColorMale((prevState) => [...prevState, color.hex]);
    };

    const handleChangeFemaleColor = (color) => {
        // set array of color hex
        setColorFemale((prevState) => [...prevState, color.hex]);
    };

    // create modal instance
    const [open, setOpen] = useState(false);
    const [type, setType] = useState('male')

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [modal2, setModal2] = useState(false);
    const toggle2 = () => setModal2(!modal2);
    const [deleteNewIdPuesta, setDeleteNewIdPuesta] = useState()
    // create fetch post newPair
    const createPair = () => {
        // create object to send
        const data = {
            user: props.user,
            numberPair: numberPair.toString(),
            anillaMale,
            yearMale,
            colorMale,
            procedencyMale,
            notesMale,
            anillaFemale,
            yearFemale,
            colorFemale,
            procedencyFemale,
            notesFemale,
            generalNotes,

            arrPuestasParejas: arrPuestasPareja
        };
        // send data to server
        fetch("http://localhost:3001/api/newPair", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                props.setPairs(data.pair);
                props.setOpen(false)
            }
            // if error
            ).catch((err) => {
                console.log(err);
            }
            // if success
            );
    }


    return (
        <>
            <Dialog open={props.open} onClose={() => props.setOpen(false)} maxWidth={'lg'}>
                <div className="p-3 font-size-xl font-weight-bold">Nueva pareja</div>
                <hr />
                    <div style={{ textAlign: "center" }}>
                        <TextField
                            label="Pareja número"
                            variant="standard"
                            value={numberPair}
                            onChange={(e) => setNumberPair(e.target.value)}
                        />
                    </div>
                    <Grid container spacing={0} className="p-4">
                        <Grid item sm={12} md={12} xl={12} className="pt-3">
                            <div className="divider-v divider-v-md" />
                            <Grid container spacing={0} className="mt-2">
                                <Grid item sm={6} className="mt-4">
                                    <div className="ml-4">
                                        <h3 className="border-bottom text-center">MACHO</h3>
                                        <div className="mt-4 line-height-sm d-flex">
                                            <TextField
                                                label="Anilla"
                                                variant="outlined"
                                                value={anillaMale}
                                                onChange={(e) => setAnillaMale(e.target.value)}
                                            />
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    views={["year"]}
                                                    label="Año"
                                                    value={yearMale}
                                                    onChange={(newValue) => {
                                                        setYearMale(newValue);
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            style={{ width: "8em" }}
                                                            className="ml-2"
                                                            variant="outlined"
                                                            helperText={null}
                                                        />
                                                    )}
                                                />
                                            </LocalizationProvider>
                                        </div>
                                        <div className="mt-4 line-height-sm d-flex">
                                            <TextField
                                                label="Procedencia"
                                                variant="outlined"
                                                value={procedencyMale}
                                                onChange={(e) => setProcedencyMale(e.target.value)}
                                            />
                                            <TextField
                                                className="ml-2"
                                                onClick={() => {
                                                    handleOpen();
                                                    setType("male");
                                                }}
                                                //   label="Color"
                                                variant="outlined"
                                                value={
                                                    colorMale.length > 0 ? colorMale.join(", ") : "Color"
                                                }
                                                style={{ width: "11em" }}
                                            />
                                            
                                        </div>

                                        <div className="mt-4 line-height-sm">
                                            <TextField
                                                variant="outlined"
                                                fullWidth
                                                id="standard-multiline-flexible"
                                                label="Notas ..."
                                                multiline
                                                maxRows="4"
                                                value={notesMale}
                                                onChange={(e) => setNotesMale(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </Grid>

                                {/**************************  HEMBRA **************************************/}

                                <Grid item sm={6} className="mt-4 line-height-sm">
                                    <div className="ml-4">
                                        <h3 className="border-bottom text-center">HEMBRA</h3>
                                        <div className="mt-4 line-height-sm d-flex">
                                            <TextField
                                                label="Anilla"
                                                variant="outlined"
                                                value={anillaFemale}
                                                onChange={(e) => setAnillaFemale(e.target.value)}
                                            />
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    views={["year"]}
                                                    label="Año"
                                                    value={yearFemale}
                                                    onChange={(newValue) => {
                                                        setYearFemale(newValue);
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            style={{ width: "8em" }}
                                                            className="ml-2"
                                                            variant="outlined"
                                                            helperText={null}
                                                        />
                                                    )}
                                                />
                                            </LocalizationProvider>
                                        </div>
                                        <div className="mt-4 line-height-sm d-flex">
                                            <TextField
                                                label="Procedencia"
                                                variant="outlined"
                                                value={procedencyFemale}
                                                onChange={(e) => setProcedencyFemale(e.target.value)}
                                            />
                                            <TextField
                                                className="ml-2"
                                                onClick={() => {
                                                    handleOpen();
                                                    setType("female");
                                                }}
                                                variant="outlined"
                                                value={
                                                    colorFemale.length > 0
                                                        ? colorFemale.join(", ")
                                                        : "Color"
                                                }
                                                style={{ width: "11em" }}
                                            />
                                            {type === "female" ? 
                                                <ModalColor
                                                    color={colorFemale}
                                                    setColor={setColorFemale}
                                                    handleChange={handleChangeFemaleColor}
                                                    open={open}
                                                    setOpen={setOpen}
                                                    onClose={handleClose}
                                                /> :
                                                <ModalColor
                                                    color={colorMale}
                                                    setColor={setColorMale}
                                                    handleChange={handleChangeMaleColor}
                                                    open={open}
                                                    setOpen={setOpen}
                                                    onClose={handleClose}
                                                />
                                            }
                                        </div>

                                        <div className="mt-4 line-height-sm">
                                            <TextField
                                                variant="outlined"
                                                fullWidth
                                                id="standard-multiline-flexible"
                                                label="Notas ..."
                                                multiline
                                                maxRows="4"
                                                value={notesFemale}
                                                onChange={(e) => setNotesFemale(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                            <div className="divider my-3" />

                            <TextField
                                className="mt-4"
                                variant="outlined"
                                fullWidth
                                id="standard-multiline-flexible"
                                label="Notas generales de la pareja ..."
                                multiline
                                maxRows="4"
                                value={generalNotes}
                                onChange={(e) => setGeneralNotes(e.target.value)}
                            />
                            <div className="divider my-3" />
                        </Grid>
                        <Card className="card-box mb-spacing-6-x2" style={{width: '100%'}}>
                        <div className="card-header">
                            <div className="card-header--title font-size-lg">
                                Nueva puesta
                            </div>
                            <div className="card-header--actions">
                                <Tooltip title="Nuevo">
                                    <Button size="small" className="btn-link px-1" 
                                            onClick={(e) => {
                                                // set new id
                                                setObjPuestasPareja({id: Math.random().toString(36)})
                                                setArrPuestasPareja((prevState) => [...prevState, objPuestasPareja])
                                                }}>
                                        <Add />
                                    </Button>
                                </Tooltip>
                            </div>
                        </div>
                        <div className="table-responsive-md">
                            <Table className="table table-alternate-spaced mt-4">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Puestas</th>
                                    <th scope="col">Nº huevos</th>
                                    <th scope="col">Inicio incubación</th>
                                    <th scope="col">Huevos claros</th>
                                    <th scope="col">Fech. Nacimiento</th>
                                    <th scope="col">Nº de Anillas puestas a pollos</th>
                                    <th scope="col">Observaciones</th>
                                    <th scope="col"></th>
                                </tr>
                                </thead>
                                <tbody>
                                {arrPuestasPareja && arrPuestasPareja.map((puesta, i) => {
                                    return (
                                        <>
                                        <tr key={i}>
                                            <td className="text-center text-black-50">
                                                <span>{i+1}</span>
                                            </td>
                                            <td className="text-center text-black-50">
                                                <TextField type="number" placeholder="Puestas" style={{width: '5em'}} value={puesta.puestas} onChange={(e) => setObjPuestasPareja({puestas: e.target.value}) } />
                                            </td>
                                            <td>
                                                <TextField type="number" placeholder="Número de huevos" style={{width: '5em'}} value={puesta.numHuevos} onChange={(e) => setObjPuestasPareja({numHuevos: e.target.value}) } />
                                            </td>
                                            <td className="display-3">
                                                <TextField className="mt-2" type="date" onChange={(e) =>setObjPuestasPareja({iniIncubacion: e.target.value})} defaultValue={puesta.iniIncubacion} />
                                            </td>
                                            <td>
                                                <TextField type="number" placeholder="Huevos claros" style={{width: '8em'}} value={puesta.huevosClaros} onChange={(e) => setObjPuestasPareja({huevosClaros: e.target.value}) } />
                                            </td>
                                            <td className="display-3">
                                                <TextField className="mt-2" type="date" onChange={(e) =>setObjPuestasPareja({fechNacimiento: e.target.value})} defaultValue={puesta.fechNacimiento} />
                                            </td>
                                            <td >
                                                <TextField type="number" placeholder="Anillas puestas" style={{width: '8em'}} value={puesta.numAnillas} onChange={(e) => setObjPuestasPareja({numAnillas: e.target.value})} />
                                            </td>
                                            <td className="text-warning">
                                                <TextField
                                                fullWidth
                                                id="standard-multiline-flexible"
                                                multiline
                                                placeholder="observaciones"
                                                maxRows="4"
                                                value={puesta.observaciones}
                                                onChange={(e) => setObjPuestasPareja({observaciones: e.target.value})}
                                            />
                                            </td>
                                            <td className="text-center">
                                                <Button size="small" className="btn-link d-30 p-0 btn-icon btn-animated-icon" 
                                                        onClick={() => { 
                                                            toggle2()
                                                            setDeleteNewIdPuesta(puesta.id)
                                                        }}>
                                                    <Delete />
                                                </Button>
                                            </td>
                                        </tr>
                                        </>
                                    )
                                })}
                                <ModalDeleteNewPuesta id={deleteNewIdPuesta} modal={modal2} toggle={toggle2} arrPuestasPareja={arrPuestasPareja} setArrPuestasPareja={setArrPuestasPareja}/>
                                <tr className="divider"></tr>
                                </tbody>
                            </Table>
                        </div>
                    </Card>
                    </Grid>
                <DialogActions>
                    <Button
                        onClick={() => props.setOpen(false)}
                        variant="contained"
                        className="m-2 btn-second"
                    >
                        Cerrar
                    </Button>
                    <Button
                        onClick={createPair}
                        disabled={numberPair === ''}
                        variant="contained"
                        className="m-2 btn-success"
                    >
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
