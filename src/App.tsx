import { useState, useEffect, useRef, SetStateAction } from 'react';
import './App.css';

const App = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const secondInputRef = useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = useState('');
    const [submittedText, setSubmittedText] = useState('');
    const [isPogaDisabled, setIsPogaDisabled] = useState(true);
    const [count, setCount] = useState(0);
    const [selectedColor, setSelectedColor] = useState('red');
    const [squares, setSquares] = useState<string[]>([]);
    const [count2, setCount2] = useState(100);
    const [textSize, setTextSize] = useState(16);
    const [liveText, setLiveText] = useState(''); 
    const colorDivRef = useRef<HTMLDivElement>(null);
    const cloneDivRef = useRef<HTMLDivElement>(null);
    const cornerDivRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
        
        const timer = setTimeout(() => {
            setIsPogaDisabled(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        document.title = liveText;
    }, [liveText]);

    const handleSubmit = () => {
        setSubmittedText(inputValue);
        setInputValue('');
        if (secondInputRef.current) {
            secondInputRef.current.focus();
        }
    };

    const addSquare = () => {
        setSquares([...squares, selectedColor]);
    };

    const incrementCount = () => {
        setCount2(prevCount => prevCount + 1);
        setTextSize(prevSize => prevSize + 1);
    };

    const decrementCount = () => {
        if (count2 > 0) { 
            setCount2(prevCount => prevCount - 1);
            setTextSize(prevSize => prevSize - 1);
        }
    };

    const handleLiveInputChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setLiveText(e.target.value);
    };

    const handleChangeColor = () => {
      if (colorDivRef.current) {
          colorDivRef.current.style.backgroundColor = 'gold';
      }
  };

  const handleCloneDiv = () => {
    if (cloneDivRef.current) {
        const newDiv = cloneDivRef.current.cloneNode(true);
        cloneDivRef.current.parentNode.insertBefore(newDiv, cloneDivRef.current.nextSibling);
    }
};

const handleSendDivToCorner = () => {
    if (cornerDivRef.current) {
        cornerDivRef.current.style.position = 'absolute';
        cornerDivRef.current.style.top = '0';
        cornerDivRef.current.style.right = '0';
        cornerDivRef.current.textContent = 'esmu stūrī';
    }
};

    return (
        <div className='containerStyle'>
            <input
                ref={inputRef}
                type="text"
                placeholder="Write something..."
            />
            <div>
                <input
                    ref={secondInputRef}
                    type="text"
                    placeholder="Write something..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button onClick={handleSubmit} className='button green'>Submit</button>
            </div>
            {submittedText && <p>{submittedText}</p>}
            <button disabled={isPogaDisabled} className='button'>Poga</button>
            <br /><br />

            <button onClick={() => setCount(prevCount => prevCount + 1)} className='button green'>
                Count: {count}
            </button>
            <div className='timesTwoRectangle'>
                {count * 2}
            </div>
            <br />

            <div>
                <button onClick={addSquare} className='button'>+</button>
                <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
                    <option value="red">Red</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="yellow">Yellow</option>
                    <option value="purple">Purple</option>
                </select>
            </div>
            
            <div style={{ display: 'flex', marginTop: '10px' }}>
                {squares.map((color, index) => (
                    <div key={index} style={{ width: '100px', height: '100px', backgroundColor: color, margin: '0 10px' }}></div>
                ))}
            </div>
            <br />

            <div>
                <button onClick={incrementCount} className='button'>+</button>
                <button onClick={decrementCount} className='button'>-</button>
            </div>

            <div style={{ fontSize: `${textSize}px`, marginTop: '10px' }}>
                Count: {count2}
            </div>
            <br />

            <input
                type="text"
                placeholder="Type here..."
                value={liveText}
                onChange={handleLiveInputChange}
            />
            <div>{liveText}</div>
            <br />

            <div ref={colorDivRef} className='taskDiv'></div>
            <button onClick={handleChangeColor} className='button'>Change color</button>
            <br />

            <div className='cloneDivContainer'>
                <div ref={cloneDivRef} className='taskDiv'></div>
            </div>
            <button onClick={handleCloneDiv} className='button'>Clone div</button>
            <br />
            
            <div ref={cornerDivRef} className='taskDiv'></div>
            <button onClick={handleSendDivToCorner} className='button'>Send div to corner</button>

        </div>
    );
};

export default App;
