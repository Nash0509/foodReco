import React, { useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import ImageDragAndDrop from './Components/DragAndDrop';
import LoaderSpin from './Components/LoaderSpin';
import Header from './Components/Header';
import Footer from './Components/Footer';
import './App.css';
import {Typewriter} from 'react-simple-typewriter';
import {GoogleGenerativeAI} from '@google/generative-ai'
import {CircleLoader} from 'react-spinners'
import { FaArrowsAlt, FaMagic } from 'react-icons/fa';
import { FaPizzaSlice } from 'react-icons/fa';
import { FaFileImage } from 'react-icons/fa';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';
import {Bar} from 'react-chartjs-2';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
)


const YourComponent = () => {

  const data = [
    { name: 'Slice 1', value: 30 },
    { name: 'Slice 2', value: 45 },
    { name: 'Slice 3', value: 25 },
  ];

  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [food, setFood] = useState('');
  const [calorie, setCalorie] = useState('');
  const [type, setType] = useState('');
  const [advice , setAdvice] = useState('');
  const [macro, setMacro] = useState('protein:10,carb:0,fat:0');
  const [chartData, setChartData] = useState(null);
  const [gemini, setGemini] = useState([]);

  const genAI = new GoogleGenerativeAI('AIzaSyCj6GkUQm7cCY5pdbtgtu15dbpgRe2Jb4k');

  useEffect(() => {

     if(food !== '') {

   //gemini

      const genAI = new GoogleGenerativeAI('AIzaSyCj6GkUQm7cCY5pdbtgtu15dbpgRe2Jb4k');

async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = `Tell me about the ${food} in the terms of its nutritional facts and the best practices after each. Give me the response in 10 points and put a '/' at the end of the each point.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
 setGemini(text.split('/'));
  
}

run();

  //gemini

     }

  }, [food, url])
 

  useEffect(() => {
    const loadModel = async () => {
      try {
        if (url) {
          setLoading(true);
          const model = await tf.loadLayersModel('/convjs2/model.json');

          // Example: Load and preprocess the image
          const imageElement = document.getElementById('inputImage');
          const resizedImage = tf.image.resizeBilinear(
            tf.browser.fromPixels(imageElement),
            [224, 224]
          );
          const normalizedImage = resizedImage
            .toFloat()
            .div(tf.scalar(255))
            .expandDims();

          // Make predictions
          const predictions = model.predict(normalizedImage);
          const predictedClassIndex = tf.argMax(predictions, 1).dataSync()[0];
          const class_labels = [
            'Biriyani',
            'Bisibelebath',
            'Butter Naan',
            'Chaat',
            'Chappati',
            'Dhokla',
            'Dosa',
            'Gulab Jamun',
            'Halwa',
            'Idly',
            'Kathi Roll',
            'Meduvadai',
            'Noodles',
            'Paniyaram',
            'Poori',
            'Samosa',
            'Tandoori Chicken',
            'Upma',
            'Vada Paav',
            'Ven Pongal',
          ];

          const calorieContent = [
            '300-500 calories per serving',
            '200-400 calories per serving',
            '200-300 calories per piece',
            '150-250 calories per serving',
            '70-80 calories per piece',
            '80-100 calories per piece',
            '70-100 calories per piece',
            '150-200 calories per piece',
            '300-400 calories per serving',
            '30-40 calories per piece',
            '300-500 calories per roll',
            '80-100 calories per piece',
            '300-400 calories per serving',
            '80-100 calories per serving',
            '80-100 calories per piece',
            '100-150 calories per piece',
            '150-300 calories per serving',
            '200-300 calories per serving',
            '300-400 calories per serving',
            '200-300 calories per serving',
          ];
          const foodTypes = [
            'Rice Dish',
            'Rice Dish',
            'Bread',
            'Street Food',
            'Bread',
            'Snack',
            'Snack',
            'Dessert',
            'Dessert',
            'Breakfast',
            'Wrap',
            'Snack',
            'Noodles',
            'Snack',
            'Bread',
            'Snack',
            'Main Course',
            'Breakfast',
            'Street Food',
            'Breakfast',
          ];

          const advice = [
            'Enjoy biryani in moderation due to its calorie content. Opt for lean meat and include vegetables for added nutrients.',
            'Bisibelebath is a nutritious option with lentils and rice. Be mindful of portion sizes and enjoy with a side of vegetables.',
            'Butter naan is delicious but high in calories. Consider sharing or opting for whole wheat naan for added fiber.',
            'Chaat can be a flavorful snack. Choose varieties with more vegetables and less fried components. Watch portion sizes.',
            'Chapati is a healthier bread option. Consider whole wheat for added fiber and pair with lean protein and vegetables.',
            'Dhokla is a steamed option, but be mindful of the accompanying chutneys. Include it as part of a balanced meal.',
            'Dosa is a low-calorie option. Pair with sambar and chutney for a balanced meal rich in protein and fiber.',
            'Gulab Jamun is a sweet treat. Enjoy it occasionally and be mindful of portion sizes to manage sugar intake.',
            'Halwa is a dessert rich in calories. Consume in moderation and choose versions with less sugar and ghee.',
            'Idly is a light and nutritious option. Pair it with sambar and chutney for a balanced breakfast.',
            'Kathi roll can be high in calories. Opt for whole wheat wraps and include plenty of vegetables for added nutrients.',
            'Meduvadai is a fried snack. Consume in moderation and balance with healthier options.',
            'Noodles can be part of a balanced meal. Choose whole grain noodles and include vegetables and lean protein.',
            'Paniyaram is a healthier snack option. Use less oil in preparation and pair with chutney or yogurt.',
            'Poori is a fried bread. Consume in moderation and pair with lighter side dishes like vegetable curry.',
            'Samosa is a fried snack. Enjoy occasionally and consider baked versions for a lighter option.',
            'Tandoori chicken is a protein-rich option. Remove the skin for a lower-fat choice.',
            'Upma is a nutritious breakfast option. Include vegetables and use less oil for a healthier preparation.',
            'Vada Paav is a street food option. Enjoy occasionally and balance with a variety of nutrient-rich foods.',
            'Ven Pongal is a comforting dish. Choose whole grains and pair with vegetables for added nutrition.',
          ];

          const macroContent = [
            "protein:10,carbs:30,fat:15",  // Biriyani
            "protein:8,carbs:40,fat:10",   // Bisibelebath
            "protein:5,carbs:25,fat:8",    // Butter Naan
            "protein:2,carbs:15,fat:5",    // Chaat
            "protein:3,carbs:20,fat:2",    // Chappati
            "protein:5,carbs:15,fat:3",    // Dhokla
            "protein:4,carbs:20,fat:1",    // Dosa
            "protein:3,carbs:30,fat:10",   // Gulab Jamun
            "protein:1,carbs:40,fat:20",   // Halwa
            "protein:2,carbs:10,fat:1",    // Idly
            "protein:12,carbs:35,fat:18",  // Kathi Roll
            "protein:5,carbs:10,fat:15",   // Meduvadai
            "protein:8,carbs:45,fat:12",   // Noodles
            "protein:3,carbs:25,fat:5",    // Paniyaram
            "protein:2,carbs:30,fat:15",   // Poori
            "protein:4,carbs:20,fat:10",   // Samosa
            "protein:25,carbs:2,fat:10",   // Tandoori Chicken
            "protein:4,carbs:25,fat:5",    // Upma
            "protein:3,carbs:30,fat:12",   // Vada Paav
            "protein:5,carbs:40,fat:10",   // Ven Pongal
          ];

          setFood(class_labels[predictedClassIndex]);
          setCalorie(calorieContent[predictedClassIndex]);
          setType(foodTypes[predictedClassIndex]);
          setAdvice(advice[predictedClassIndex]);
          setMacro(macroContent[predictedClassIndex]);
          setLoading(false);
        
        
        }
      } catch (error) {
        console.error('Error loading the model:', error);
      }
    };

    loadModel();
  }, [url]);

  useEffect(() => {
    // Update the chart data whenever the 'macro' state changes
    if (macro) {
      const macroValues = macro.split(',').reduce((acc, item) => {
        const [key, value] = item.split(':');
        acc[key.trim().toLowerCase()] = parseInt(value.trim());
        return acc;
      }, {});

      setChartData({
        labels: Object.keys(macroValues),
        datasets: [
          {
            label: 'MacroNutrients',
            data: Object.values(macroValues),
            backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
            borderWidth: 1,
          },
        ],
      });
    }
  }, [macro]);

  function handleDrop(url) {
    setUrl(url);
    setGemini('');
  }

  return (
    <div style={{ margin: '0', padding: '0' , backgroundColor:'black', color:'white'}} className="main">
      <Header />
      <div className="one" style={{backgroundColor:'black'}}>
        <div className="two">
          <h1>Know your food <FaPizzaSlice /><span style={{fontWeight:'bold', color:'white'}}>  <Typewriter
            words={[ 'Better!']}
            loop={100}
            cursor
            cursorStyle='|'
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          /></span></h1>
        </div>
      </div>

      <h1 className="letsKnow">Let's know about your food <FaPizzaSlice /></h1>
      <div style={{ textAlign: 'center', border:'1px dashed white' }} className="please">
        {url === null ? <h1>Please <FaArrowsAlt />  Drag and drop a food image...</h1> : ''}
      </div>
      <div className="amage">
        {url === null ? (
         <div className="imageSubsContainer">
         <div className="imageSubs">
           <div className='sun' style={{color:'black'}}><h1>Image <FaFileImage /></h1></div>
         </div>
       </div>
        ) : (
          <img id="inputImage" src={url} alt="Input" className="inputImage1" />
        )}
      </div>
      <ImageDragAndDrop doit={handleDrop} />

      <div className='data'>
        {loading ? (
         <div className='loadSpinContainer'>
         <LoaderSpin className='loadSpin'/>
       </div>
        ) : url === null ? (
          ' '
        ) : (
        <div>
         {
          (food === '') ? <div className='res' style={{color:'white', border:'1px dashed white'}}><p>Results  </p>
          <h1>Your results will appear here...</h1></div> : <div className="who">
            <h1 style={{color:'black'}}>Results</h1>
          <table className='tab'>
            <thead>
                 <th>#</th>
                 <th>Property</th>
                 <th>Value</th>
            </thead>
            <tr  className='sp'>
              <td>1.</td>
              <td>Food Name</td>
              <td>{food}</td>
            </tr>
            <tr className='al1'>
              <td>2.</td>
              <td>Type</td>
              <td>{type}</td>
            </tr>
            <tr className='sp'>
              <td>3.</td>
              <td>Calories</td>
              <td>{calorie}</td>
            </tr>
            <tr className='al1'> 
              <td>4.</td>
              <td>Advice</td>
              <td>{advice}</td>
            </tr>
          </table>
          </div>
          
         }
        </div>
        )}
      </div>
      <div className="gemini">
        <h1>Insights from gemini &nbsp;<FaMagic /></h1>
        {

       (gemini.length == 0) ? <div className='loader'><CircleLoader size={100} style={{color:'white'}}/> <div className="cook">
        <Typewriter
       words={[ 'Cooking✨']}
       loop={100}
       cursor
       cursorStyle='|'
       typeSpeed={70}
       deleteSpeed={50}
       delaySpeed={1000}
       />
        </div></div> : <div className='insi'> <Typewriter
       words={gemini}
       loop={100}
       cursor
       cursorStyle='|'
       typeSpeed={40}
       deleteSpeed={10}
       delaySpeed={1000}
      /></div> 

        }
      </div>
      <h1 style={{textAlign:'center', fontFamily:'sans-serif'}}>Graph</h1>
      <div className="graph" style={{backgroundColor:'black', marginBottom:'5rem'}}>
      
      {chartData ? (
          <Bar data={chartData}/>
        ) : (
          <h3>Will come soon...</h3>
        )}
</div>

 <div style={{textAlign:'center', fontFamily:'sans-serif', lineHeight:'25px', fontSize:'1.5rem', padding:'1rem'}}>
   <h1>How to use</h1>

   <p style={{marginTop:'4rem', marginBottom:'4rem'}}>Hi, I am Nishant 👋. This is kalorie.ai and with this app you can predict the amount of calories thats inside your food. All you need to do is provide the image of your food. You can do that by drag 'n' drop in to the box above. <br /><br />
   
   Along with that we have Google's AI model 'Gemini', which will provide you the 10 advice points on the food detected. <br /><br />Just drag 'n' drop and have fun with your food.  </p>
 </div>

      <Footer />
    </div>
  );
};

export default YourComponent;
