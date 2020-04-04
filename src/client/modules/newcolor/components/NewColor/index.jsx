import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { ChromePicker } from 'react-color';
import EditCanvas from '../EditCanvas';
import style from './style.sass';
import { LanguageContext } from 'components/LanguageContext';

const DEFAULTVALUE = '#81EEFF';

const NewColor = ({ defaultColors, onAdd, onRedirect }) => {
  const language = useContext(LanguageContext);

  const [editColor, setEditColor] = useState(DEFAULTVALUE);
  const [activeIndex, setActiveIndex] = useState(0);
  const [colorValue, setColorValue] = useState(
    defaultColors
      ? [
          `#${defaultColors.substring(0, 6)}`,
          `#${defaultColors.substring(6, 12)}`,
          `#${defaultColors.substring(12, 18)}`,
          `#${defaultColors.substring(18, 24)}`,
        ]
      : [null, null, null, null]
  );

  const onSubmit = () => {
    let good = true;
    colorValue.forEach((v) => {
      if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(v)) {
        good = false;
      }
    });
    if (good) {
      onAdd([...colorValue]);
      resetColor();
    } else {
      console.error('Invalid color');
    }
  };

  const onPickColor = ({ hex }) => {
    const newColorValue = [...colorValue];
    newColorValue[activeIndex] = hex;
    setColorValue(newColorValue);
    setEditColor(hex);
  };

  const onClickRow = (activeIndex) => {
    const editColor = colorValue[activeIndex] || DEFAULTVALUE;
    setEditColor(editColor);
    setActiveIndex(activeIndex);
  };

  const resetColor = () => {
    setColorValue([null, null, null, null]);
  };

  return (
    <div className={style.container}>
      <div className={style.floor0}>
        <div>
          <ChromePicker color={editColor} onChangeComplete={onPickColor} />
        </div>
        <div>
          <EditCanvas
            colorValue={colorValue}
            activeIndex={activeIndex}
            onClickRow={onClickRow}
          />
        </div>
      </div>
      <div className={style.floor1}>
        <button className="button is-primary" onClick={onSubmit}>
          {language.submit}
        </button>
        <button className="button" onClick={resetColor}>
          {language.reset}
        </button>
        <button
          className="button is-info"
          onClick={() => {
            onRedirect('/');
          }}
        >
          {language.return}
        </button>
      </div>
    </div>
  );
};

NewColor.propTypes = {
  defaultColors: PropTypes.string,
  onAdd: PropTypes.func,
  onRedirect: PropTypes.func,
};

export default NewColor;
