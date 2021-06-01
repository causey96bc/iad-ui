import React from "react";
import store from "../stores/SearchStore";
import { lines, claimsSel, secondary } from "./metaconfig";
import { toJS } from "mobx";
import CheckBoxes from "./Checkboxes";
import {
  Button,
  FormControl,
  Grid,
  makeStyles,
} from "@material-ui/core";
import { observer } from "mobx-react-lite";

const Selections = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
    },
  }));
  const classes = useStyles();
  return (
    <Grid container spacing={2}>
      <Grid item md={6}>
        <FormControl component="fieldset" className={classes.formControl}>
          {lines.map((claims, key) => (
            <CheckBoxes
              key={key}
              data={claims}
              indicators={toJS(store.active)["dl_selections"]}
            />
          ))}
        </FormControl>
      </Grid>
      <Grid item md={6}>
        <FormControl component="fieldset" className={classes.formControl}>
          {claimsSel.map((claims, key) => (
            <CheckBoxes
              key={key}
              data={claims}
              type="radio"
              indicators={toJS(store.active)["dl_selections"]}
            />
          ))}
          {secondary.map((claims, key) => (
            <CheckBoxes
              key={key}
              data={claims}
              indicators={toJS(store.active)["dl_selections"]}
            />
          ))}
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
          <Button
            variant="contained"
            color="secondary"
            type="reset"
          >
            Cancel
          </Button>
        </FormControl>
      </Grid>
    </Grid>

  )
}

export default observer(Selections);