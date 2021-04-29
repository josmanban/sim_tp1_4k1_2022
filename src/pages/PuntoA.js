import {useState, useEffect} from 'react';
import { CongruencialMixto, CongruencialMultiplicativo} from '../services/Generadores';

const PuntoA = ()=>{

    const [generador, setGenerador] = useState(1);
    const [k, setK] = useState();
    const [g, setG] = useState();
    const [c, setC] = useState();
    const [x0,setX0] = useState();
    const [generadorInstance, setGeneradorInstance] = useState(new CongruencialMultiplicativo());
    const [data,setData] = useState([]);

    useEffect(()=>{
        if(generador===1){
            setGeneradorInstance(new CongruencialMixto(x0,k,g,c));
        }else if(generador===2) {
            setC('');
            setGeneradorInstance(new CongruencialMultiplicativo(x0,k,g));
        }
        setData([])
    },[generador,x0,k,g,c]);

    const generarNumeros = () => {
        const auxData=[];
        for( let i= 0;i<20;i++){
            let xiOlder = generadorInstance.x0;
            if (i>0){
                xiOlder = auxData[i-1].xi;
            }

            const xi = generadorInstance.calcularNextXi(xiOlder);
            const randomNumber = generadorInstance.calcularRandom(xi);

            auxData.push({
                i:i,
                xi: xi,
                randomNumber:randomNumber.toFixed(4),
            });
        }
        setData(auxData);
    }

    const addRow = ()=> {
        const lastRow = data[data.length-1];
        const xi = generadorInstance.calcularNextXi(lastRow.xi);
        data.push({
            i:lastRow.i+1,
            xi: xi,
            randomNumber: generadorInstance.calcularRandom(xi).toFixed(4),
        });
        setData([...data]);
    }

    return (
        <>
        <div>
            <h1>PuntoA</h1>
            <div>
                <label>Metodo:</label>
                <select
                    onChange={ e=>{
                        setGenerador(Number.parseInt(e.target.value));
                    }}
                    >   
                    <option value='1'>CONGRUENCIAL MIXTO</option>
                    <option value='2'>CONGRUENCIAL MULTIPLICATIVO</option>
                </select>
            </div>
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
                    value={k}
                    onChange={(e)=>{
                        setK(Number.parseInt(e.target.value));
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
            {generador===1 &&
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
            }            
            <div>
                <label>A:</label>
                <input 
                    type='number'
                    disabled={true}
                    value={generadorInstance.a}                    
                />
            </div>
            <div>
                <label>M:</label>
                <input 
                    type='number'
                    disabled={true}
                    value={generadorInstance.m}                    
                />
            </div>            
            <input 
                type='button'
                value='GENERAR'
                onClick={generarNumeros}
            />
            {data.length>1 &&
                <input 
                    type='button'
                    value='+1'
                    onClick={addRow}
                />
            }
        </div>
        <div>            
            <table>
                <thead>
                    <th>i</th>
                    <th>Xi</th>
                </thead>
                <tbody>
                {data.map((row,i) => (
                    <tr>
                        <td>{i+1}</td><td>{row.randomNumber}</td>
                    </tr>))}
                </tbody>
            </table>
        </div>
        </>
    );
}

export default PuntoA;