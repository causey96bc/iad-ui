import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import store from "../stores/SearchStore";

const CheckBoxes = ({ data, indicators = {}, type = "checkbox" }) => {
  const [htmlId, heading, labels] = data;
  const selAll = (e) => {
    const checked = e.target.checked;
    let checkedArray = document.querySelectorAll(
      `input[id^="${e.target.id}"]:not(#${e.target.id})`
    );
    store.selectAll(
      Array.from(checkedArray).map((elem) => {
        return elem.name;
      }),
      checked
    );
  };
  const updateIndicators = (e) => {
    store.updateIndicators({ name: e.target.name, value: e.target.checked });
  };

  return (
    <>
      <h5>{heading}</h5>
      {type === "checkbox" ? (
        <FormControl>
          <FormControlLabel
            label="Select All"
            control={
              <Checkbox
                id={htmlId}
                onClick={selAll}
                className={`${htmlId}`}
              ></Checkbox>
            }
          />
          {labels.map(([key, title, disabled], index) => <FormControlLabel
            label={title}
            control={
              <Checkbox
                id={htmlId + "-" + index}
                disabled={disabled}
                onChange={updateIndicators}
                name={key}
                checked={indicators[key]}
              />
            }
          />
          )}
        </FormControl>) : <RadioGroup>
        {labels.map(([key, title, disabled], index) => <FormControlLabel
          label={title}
          control={
            <Radio
              id={htmlId + "-" + index}
              disabled={disabled}
              value={title}
              onChange={updateIndicators}
            />
          }
        />)}
      </RadioGroup>
      }
    </>
  );
};

export default observer(CheckBoxes);
