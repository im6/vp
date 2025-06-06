import { useState } from 'react';
import PropTypes from 'prop-types';
import { ChromePicker } from 'react-color';
import { useNavigate, useLocation } from 'react-router-dom';
import EditCanvas from '../EditCanvas';
import * as style from './style.sass';
import useTranslationContext from '../../../../../hooks/useTranslationContext';
import { isValidColorStr } from '../../../../../util';

const DEFAULTVALUE = '#81EEFF';

const NewColor = ({ onAdd, onColorInvalid }) => {
  const [language] = useTranslationContext();
  const navigate = useNavigate();
  const { search } = useLocation();
  const searchLower = search.toLowerCase();
  const defaultColorsPotential = searchLower.match(/[a-f0-9]{24}/);
  const defaultColors = defaultColorsPotential && defaultColorsPotential[0];

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
    const colorStr = colorValue.join('');
    const good = isValidColorStr(colorStr);
    if (good) {
      onAdd(colorStr.substr(1));
      resetColor();
    } else {
      onColorInvalid();
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
            navigate('/');
          }}
        >
          {language.return}
        </button>
      </div>
    </div>
  );
};

NewColor.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onColorInvalid: PropTypes.func.isRequired,
};

export default NewColor;
