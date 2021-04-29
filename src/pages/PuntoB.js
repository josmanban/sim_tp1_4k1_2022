import {useState, useEffect} from 'react';
import { PruebaChiCuadrado } from '../services/PruebaChiCuadrado';
import { CongruencialMixto } from '../services/Generadores';
import { Bar } from 'react-chartjs-2';

const PuntoB = () => {
    const [k,setK] = useState(10);
    const [n,setN] = useState(0);
    const [muestra,setMuestra] = useState([]);
    const [chiInstance, setChiInstance] = useState();
    const [rows,setRows] = useState([]);
    const [chartData, setChartData] = useState({});


    const [generatorType, setGeneratorType] = useState(1);
    const [kk, setKk] = useState();
    const [g, setG] = useState();
    const [c, setC] = useState();
    const [x0,setX0] = useState();
    const [generadorInstance, setGeneradorInstance] = useState(null);

    const generarMuestra = (size) => {
        const aux = [];
        if(generatorType===1){
            for(let i=0;i<size;i++){
                aux.push(parseFloat(Math.random().toFixed(4)));
            }
        }else if(
            generadorInstance
            && x0 && kk && g && c){
            let xiOlder = generadorInstance.x0;
            for( let i= 0;i<size;i++){
                const xi = parseFloat(generadorInstance.calcularNextXi(xiOlder));
                const randomNumber = generadorInstance.calcularRandom(xi);    
                aux.push(parseFloat(randomNumber.toFixed(4)));
                xiOlder = xi;
            }
        }
        return aux;
    };

    useEffect(()=>{
        setN(0);
        setChiInstance(null);
        if(generatorType===2){
            setGeneradorInstance(new CongruencialMixto(x0,kk,g,c));            
        }else {
            setGeneradorInstance(null);            
        }              
    },[generatorType,x0,kk,g,c]);

    useEffect(()=>{
        const chi = new PruebaChiCuadrado(k,muestra);
        chi.calcularChiCuadrado();
        setChiInstance(chi);
    },[muestra,k]);

    useEffect(()=>{        
        setMuestra(generarMuestra(n));        
    }, [n]);   

    useEffect(()=>{
        if(chiInstance){
            setRows(chiInstance.data);
        }
    },[chiInstance]);

    useEffect(()=>{
        const auxChartData = {
            labels:[],
            datasets:[
                {
                    label:'FO',
                    data:[],
                    backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',                    
                    ],
                    borderColor: [
                    'rgba(255, 99, 132, 1)',
                    ],
                    borderWidth: 1,
                },
                {
                    label:'FE',
                    data:[],
                    backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',                    
                    ],
                    borderColor: [
                    'rgba(54, 162, 235, 1)',
                    ],
                    borderWidth: 1,
                }],
        };
        rows.forEach(row=>{
            auxChartData.labels.push(row.mc);
            auxChartData.datasets[0].data.push(row.fo);
            auxChartData.datasets[1].data.push(row.fe);
        });
        setChartData(auxChartData);
    },[rows]);

    return (
    <>
    <h1>Punto B y C</h1>
    <div 
        style={{
            width:'48%',
            display:'inline-block',
            verticalAlign:'top',
            textAlign:'right',
    }}>
        <div>
            <label>K:</label>
            <input 
                type='number' 
                value={k}
                onChange={(e)=>{
                    setK(Number.parseInt(e.target.value));
                }}
                />
        </div>
        <div>
            <label>N:</label>
            <input 
                type='number' 
                value={n}
                onChange={(e)=>{
                    setN(Number.parseInt(e.target.value));
                }}
            />
        </div>
    </div>
    <div 
        style={{
            width:'50%',
            display:'inline-block',
            verticalAlign:'top',
            textAlign:'left',
            marginLeft:'1em',
    }}>
        <label>Tipo Generador:</label>
        <select
            onChange={ e => {
                setGeneratorType(Number.parseInt(e.target.value));
            }}
            > 
            <option value='1'>DEL LENGUAJE</option>
            <option value='2'>CONGRUENCIAL MIXTO</option>
        </select>
        { generatorType === 2 &&
            <>
                <div>
                    <label>Xo:</label>
                    <input 
                        type='number' 
                        value={x0}
                        onChange={(e)=>{
                            setX0(Number.parseInt(e.target.value));
                        }}
                        />
                </div>
                <div>
                    <label>K:</label>
                    <input 
                        type='number' 
                        value={kk}
                        onChange={(e)=>{
                            setKk(Number.parseInt(e.target.value));
                        }}
                    />
                </div>
                <div>
                    <label>G:</label>
                    <input 
                        type='number' 
                        value={g}
                        onChange={(e)=>{
                            setG(Number.parseInt(e.target.value));
                        }}
                    />
                </div>            
                <div>
                    <label>C:</label>
                    <input 
                    type='number' 
                    value={c}
                    onChange={(e)=>{
                        setC(Number.parseInt(e.target.value));
                    }}
                />
                </div>
                <div>
                    <label>A:</label>
                    <input 
                        type='number'
                        disabled={true}
                        value={generadorInstance?generadorInstance.a:''}                    
                    />
                </div>
                <div>
                    <label>M:</label>
                    <input 
                        type='number'
                        disabled={true}
                        value={generadorInstance?generadorInstance.m:''}                    
                    />
                </div>
            </>        
        }
    </div>
    
    <div>
        <div style={{
            width:'48%',
            display:'inline-block',
            verticalAlign:'top'
        }}>
            <h2>Muestra</h2>
            <table>
                <thead>
                    <th>i</th>
                    <th>Xi</th>
                </thead>
                <tbody>
                {muestra.map( (item,i) => (
                    <tr>
                        <td>{i+1}</td><td>{item}</td>
                    </tr>))}
                </tbody>
            </table>
        </div>
        <div style={{
            width:'50%',
            display:'inline-block',
            marginLeft:'1em',
        }}>
        <table>
            <thead>
                <th>i</th>
                <th>Min</th>
                <th>Max</th>
                <th>MC</th>
                <th>FO</th>
                <th>FE</th>
                <th>FO-FE</th>
                <th>(FO-FE)^2</th>
                <th>(FO-FE)^2/FE</th>
                <th>C = Σ (FO-FE)^2/FE </th>
            </thead>
            <tbody>
                {rows.map((row,i)=>(<tr>
                    <td>{i+1}</td>
                    <td>{row.min}</td>
                    <td>{row.max}</td>
                    <td>{row.mc}</td>
                    <td>{row.fo}</td>
                    <td>{row.fe}</td>
                    <td>{row.col1}</td>
                    <td>{row.col2}</td>
                    <td>{row.col3}</td>
                    <td>{row.c}</td>
                </tr>))}
            </tbody>
        </table>
        <Bar data={chartData}/>
        </div>
    </div>
    </>);
}

export default PuntoB;