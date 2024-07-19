/*
Fontos, hogy csináltunk egy json file-t, ami egy tömb, amiben vannak objektumok és akkor valamelyik kulcsa is egy tömb és abban 
is vannak objektumok és akkor ezeken lehet majd végigmenni itt map-vel 

fontos, hogy az egész json egy {}-ban legyen!!!! 
itt a kulcsok és az értékek is egy ""-ban vannak, nem úgy, mint sima JavaScript-ben, hogy csak az érték van egy ""-ban!!!!!!!!! 

Hogy szerezhetjük meg, ami itt van nekünk egy json file-ban, ez nem olyan, mint egy api, hogy kell a response/catch vagy a async/await 
hanem csak meg kell határozni az elérési útvonalat, mint egy képnél a require()-ben!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

Bootstrap grid-et használunk és itt kell majd két div!!!!! 
Nem úgy, mint egy sima rendszernél, hogy megadunk egy div-nek 
-> 
<div className="grid-col-4"></div>
hanem itt az első div-nek meg kell adni mindig egy olyat, hogy row ami flex lesz, ami miatt majd bemegy 
és a második div-nek meg egy col-lg-3-at, hogy milyen széles legyen a div és mennyire osztja majd fel a területet!!!! 
->
<div className="row">
    <div className="col-lg-3"></div>
</div>

ez a json file-unk 
-> 
{
    "lessons": [
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
    ]
}
*/
 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, UseState } from "react";
import { Link } from "react-router-dom";

/*
A Link a react-router-dom-ból jön, mert ezzel lehet majd oldalról oldalra menni 
van egy to attributja, ahol meg lehet adni, hogy hova menjen ("/" vagy "/products") ahova akarunk és van ilyen oldalunk 

és ha ebbe belerakunk egy fontAwesome-os ikont, akkor arra kattintva, tudunk majd oda menni
-> 
<Link className="color-secondary-lighter" to={"/lesson/" + i}>
    <FontAwesomeIcon icon="fa-solid fa-arrow-up-right-from-square" />
</Link>

itt pl. a lesson-ra megyünk mégpedig id alapján, ezért fontos, hogy ez az ikon a map-on belül legyen, hogy meg tudjuk neki adni a 
i-t, mint index 
és akkor minden lesson-nak lesz egy ilyen ikon-ra és rá tudunk kattintani, hogy arra az url-re menjen, hogy /lesson/1, /lesson/2 
amelyik i-ről van szó 

fontos, hogy az App.js-en így adtuk meg a path-ot és a dinamikus url lessonId lesz majd az i!!!!!!!! 
-> 
<Route path="/lesson/:lessonID" element={<Lesson/>}/>
*/

function Lessons() {
    const [lessons, setLessons] = useState([]);
    /*
    Ebbe fogjuk majd set-elni ami lessons.json-ban benne van!!!!! 
    ezt meg egy require-vel megszerezzük!!!!! 
    */

    const getLessons = ()=> {
        try {
            const json = require("../lessons.json");
            setLessons(json.lessons);
            //fontos, hogy csak a lessons-re set-elünk, azért mert van egy {} kijebb 
        } catch(err) {
            console.log(err);
        }
    }

    //ezt egy useEffect-ben meghívjuk, amikor elöször render a komponens!!! 
    useEffect(()=> {
        getLessons();
        //megszereztük a require-vel a lessons.json-t és set-eltük vele a lessons useState-s változót 
    }, []);

    return(
        <div className="container text-center">
            <h1>Lessons</h1>

            <div className="row">
                {
                    lessons.map((l, i)=> 
                        <div key={i} className="col-lg-3 p-md box-primary">
                            <h3 className="color-white">{l.title}</h3>
                            <p className="color-white">
                                {p.description}
                            </p>
                            <div>
                                <Link className="color-secondary-lighter" to={"/lesson/" + i}>
                                    <FontAwesomeIcon icon="fa solid fa-arrow-up-right-from-square"/>
                                </Link>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

/*
            <div className="row">
                {
                    lessons.map((l, i)=> 
                        <div key={i} className="col-lg-3 p-md box-primary">
                            <h3 className="color-white">{l.title}</h3>
                            <p className="color-white">
                                {p.description}
                            </p>
                            <div>
                                <Link className="color-secondary-lighter" to={"/lesson/" + i}>
                                    <FontAwesomeIcon icon="fa solid fa-arrow-up-right-from-square"/>
                                </Link>
                            </div>
                        </div>

Mindegyik lesson-nek csinálunk egy grid-et? amiben meg lesz jelenitve egy title h3-ban utána a description, ami kicsit hosszabb egy p-ben 
és egy div-ben pedig lesz egy Link, amiben egy ikon és arra kattintva rá tudunk menni arra a leckére, amire akarunk és i alapján csinálunk 
neki egy url-t majd a lesson.js-ben!!!!  
*/
export default Lessons;