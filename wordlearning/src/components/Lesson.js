/*
itt lesz egy lessonId amit megszerezünk a useParams-val!!!!!!
tehát az elözö oldalon ott megadtuk, hogy hova szeretnénk menni amikor rákattintunk az ikon-ra 
és az i segítségével, amit a map-ból kaptunk meg ezt lementjük!!! 

<Link className="color-secondary-lighter" to={"/lesson/" + i}>
    <FontAwesomeIcon icon="fa solid fa-arrow-up-right-from-square"/>
</Link>
plusz 
<Route path="/lesson/:lessonID" element={<Lesson/>}/>
*/
import {useState, Useeffect } from "react";
import { useParams } from "react-router-dom";

function Lesson() {
    const [lesson, setLesson] = useState({});
    /*
    ide fogjuk lementeni az egy lesson-okat és mivel ez egy objektum lesz, ezért az alapértéke is egy objektum 
    {
            "title": "Lesson1",
            "discription": "Ezek itt angol szavak",
            "words": [
                {
                    "eng": "dog",
                    "hun": "kutya"
                },
                {
                    "eng": "cat",
                    "hun": "macska"
                },
                {
                    "eng": "tree",
                    "hun": "fa"
                },
                {
                    "eng": "duck",
                    "hun": "kacsa"
                }
            ]
        }
        ezt rakjuk majd bele, set-eljük vele, de viszont itt lehet majd több lesson is és mindig majd az aktuális-val set-eljük 
        ehhez kell egy index is amit megadunk majd a Lessons tömb-nek és itt ezt nem úgy csináljuk, hogy létrehozunk egy index-et 
        hanem ez nekünk már meg van -> const lessonId és ennek az értékétől függően jelenítjük meg!!!!! 
        és itt majd lesz olyan is, hogy /lesson/0!!!!! 
    */ 
    const { lessonId } = useParams();
    /*
    ezzel szerezzük meg az id-t és akkor majd tudjuk, hogy melyik url-hez mit jelenítünk majd meg!!!!! 
    ha ez /lesson/1 lesz, akkor azt, amit bemásoltam a lesson alá, de viszont ha /lesson/2 akkor meg egy másik ilyet ha van!!! 
    és akkor a lesson-ön, amelyiknél nyomunk rá a link-re arra fog menni és az lesz az url-ben is!!!!!!!! 
    */ 
    const [started, setStarted] = useState(false);
    /*
    Azért kellett, mert lesz egy select-es option-ös dolog, hogy ki tudjuk választani, hogy mi most angol szavakat akarunk látni 
    és magyarul megadni vagy fordítva 
    tehát itt még a started az false kell, hogy legyen, majd ha ezt kiválasztottuk 
                    !started &&
                <>
                    <h2>Mode</h2>
                    <select onChange={(e) => setMode(e.target.value)}
                        className="input-md input-primary mr-md">
                        <option value="">Select the mode!</option>
                        <option value="eng">eng-hun</option>
                        <option value="hun">hun-eng</option>
                    </select>

                    <button onClick={start} className="input-md btn-secondary">Start!</button>

    és legeneráltuk a szavunkat, rákattintunk a start gombra, aminek meg van adva ez a start függvény, akkor ott true-ra lesz set-eljük!!!! 
    a return-be megadjuk, hogyha ez true, akkor megmutatjuk a random szavunkat és csinálunk egy input-ot is amibe mi bele tudunk írni 
    hogy mi az a random szó, ha angolul van azt a mode-ot választottuk ki akkor magyarul kell beírni az input-ba!!!!!!! 
    */
    const [mode, setMode] = useState("");
    /*
    Ebben mentjük el a mode-ot (felül van bemásolva) és itt attól függ, hogy ennek mi az értéke generáljuk le a szót, tehát, hogy a magyar-t 
    kell megmutatni és a user majd angolul írja be vagy fordítva!!!! 
    */
    const [randIndex, setRandIndex] = useState(-1);
    /*
    a lesson-ba van egy kulcsunk, hogy words, ami egy tömb objektumokkal és ehhez kell a randIndex, hogy kiválasszunk egyet 
    egy ilyet random!!!!!! 
                {
                    "eng": "dog",
                    "hun": "kutya"
                },
                {
                    "eng": "cat",
                    "hun": "macska"
                },
                {
                    "eng": "tree",
                    "hun": "fa"
                },
                {
                    "eng": "duck",
                    "hun": "kacsa"
                }
    */
    const [answer, setAnswer] = useState("");
    /*
    ezt meg majd kiszedjük a input-ból, amit beírt a user és majd ezt kell összehasonlítani, de ez kicsit nehezebb, mert 
    ennél a példánál a tree-t írjuk majd a ki a user beírja, hogy fa és nekünk nem azzal kell majd összehasonlítani, ami ki van írva 
    hanem az objektumba pont a másikkal!!!! 
    "eng": "tree",
    "hun": "fa"
    */

    /*
    megszerezzük az egyes leckét a lessons tömbből a lessonId alapján!!!!! 
    és ezt jelenítjük meg, tehát itt mindig azt kell megjeleníteni, amit a lessons-nél rákattintottunk és akkor ott meg lesz adva 
    az i, ami a lessonId lesz!!!!! 
    ezt nagyon fontos megérteni, hogy müködik 
    1. csinálunk egy ilyet az App-on -> <Route path="/lesson/:lessonID" element={<Lesson/>}/>
    2. a lessons-ön megadjuk egy link-vel, hogy hova vigyen minket -> to={"/lesson/" + i}>
    3. itt csinálunk egy useParams-ot -> const { lessonId } = useParams();
    4. megadjuk a lessons-nak a lessonId, hogy tudjuk, hogy melyiket kell majd itt megjeleníteni -> setLesson(json.lessons[lessonId]);
    */
    const getLessonByIndex = ()=> {
        //és az index-et a lessonId!!!! 
        const json = require("../lessons.json");
        setLesson(json.lessons[lessonId]);
    }

    //generálunk egy random számot a from és a to segítségével és majd meghíásnál megadjuk a from-ot meg a to-t 
    const randNumber = (from, to) => Math.floor(Math.random * ((to - from) + 1) + from);//fontos, hogy itt kettős () lesz!!!!! 

    /*
    fontos, hogy ez a függvény meg lesz adva egy onClick-vel egy button-nak!!!!!! 
    ->
    <button onClick={start} className="input-md btn-secondary">Start!</button>
    3. dolgot csinálunk benne 
    1. ha mode nincsen kiválasztva, akkor return 
    2. set-eljük a randIndex-et azzal, amit elöbb csináltunk randNumber, tehát azt meghívjuk és megadjuk neki a from-ot meg a to-t 
    3. set-eljük a started, hogy most már elkezdödött a játék és megmutathatjuk majd a random szavunkat meg az input mezőt  
    */ 
    const start = ()=> {
        //1.
        if(mode === 0) {
            alert("You should select a mode!");
            return;
        }
    
        //2.
        randIndex(randNumber(0, lesson.words.length - 1));
    
        //3.
        setStarted(true);
    
    }

    //itt lesz még egy send függvény 

    //useEffect-ben meghívjuk ezt a getLessonByIndex-et 
    Useeffect(()=> {
        getLessonByIndex();
    }, []);

    return(
        <div className="container center-text box-light-grey p-lg">
            <h1>Lesson</h1>

            {
                !started && 
                <>
                    <h3>Mode</h3>
                    <select className="input-md input-primary mr-md"
                    onChange={(e)=>setMode(e.target.value)} value={mode}> 
                        <option value="">Select the mode!</option>
                        <option value="eng">eng-hun</option>
                        <option value="hun">hun-eng</option>
                    </select>

                    <button onclick={start} className="input-md btn-secondary"></button>
                </>
            }

            {
                started && 
                <div className="box-secondary p-md mt-lg maxw-500 margin-x-auto">
                    <h3 className="color-white">{lesson.words[randIndex][mode]}</h3>
                    <input className="input-md input-secondary mr-md"
                    onChange={(e)=>setAnswer(e.target.value)} type="text" value={answer}></input>

                    <button onclick={send} className="input-md btn-dark-grey mr-md">Send</button>
                    <button className="input-md btn-warning">Quit</button>
                </div>
            }
        </div>
    );
    
}

/*
            {
                !started && 
                <>
                    <h3>Mode</h3>
                    <select className="input-md input-primary mr-md"
                    onChange={(e)=>setMode(e.target.value)} value={mode}> 
                        <option value="">Select the mode!</option>
                        <option value="eng">eng-hun</option>
                        <option value="hun">hun-eng</option>
                    </select>

                    <button onclick={start}></button>
                </>
            }

Tehát ha a started az false és nem kezdtük el és utána fontos a &&!!!!!! 
azért kellett <></> egy ilyenbe bele tenni, mert itt nem csak a select lesz hanem egy button is

Ami még nagyon fontos, hogy az legyen az értéke ennek mint az objektum-ban a kulcsok nevei, mert így tudjuk majd őket megjeleníteni!!!!! 
<option value="eng">eng-hun</option>
<option value="hun">hun-eng</option>
és amit választunk az lesz az értéke a mode useState-s változónak!!!!! 
ez meg a json file 
->

"eng": "dog",
"hun": "kutya"
és akkor így tudjuk megjeleníteni, hogy dog hogyha en-re van állítva a mode és a randNumber pedig 0-át adott vissza, 
mert ez a nulladik indexű a json-ben
-> 
lesson.word[randNumber][mode]!!!!!!!!!!!!!!!!!!!!!!!!!
*****************
                started && 
                <div className="box-secondary p-md mt-lg maxw-500 margin-x-auto">
                    <h3 className="color-white">{lesson.words[randIndex][mode]}</h3>
                    <input className="input-md input-secondary mr-md"
                    onChange={(e)=>setAnswer(e.target.value)} type="text" value={answer}></input>

                    <button onclick={send} className="input-md btn-dark-grey mr-md">Send</button>
                    <button className="input-md btn-warning">Quit</button>
                </div>

Ha pedig started van, akkor megjelenítjük a szavunkat, csinálunk egy input-ot és button-öket 
itt set-etljük a useState-s answer-t az input-ból 

fontosak még a className-ek 
<div className="box-secondary p-md mt-lg maxw-500 margin-x-auto">

Fontos, hogyha van egy useState-s, akkor végiggondolni, hol fogjuk set-elni majd az értékét 
1. a return-ben kapjuk meg hozzá az értéket pl. answer 
2. vagy egy függvényben set-eljük mondjuk, amit pl. megadunk egy button-nak, ilyen a started, ezek általában a boolean 
értékű useState-s változók meg ilyen, amikor leszedünk valamit és meghíjuk egy useEffect-ben, ilyen a lesson!!!! 
*/

export default Lesson;
