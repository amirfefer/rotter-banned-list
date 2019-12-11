import React from 'react';
import FadeIn from 'react-fade-in';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Linkify from 'react-linkify';
import useStyles from './styels';

import {
  DATE,
  MANAGER,
  CAUSE,
  ACTION,
  BANNED,
  EXPELLED,
} from '../../common/consts';

const Cards = ({ items }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const expelledOrBanned = (action) => action === BANNED || action === EXPELLED;

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div id="cards">
      {/* <FadeIn> */}
      {items.map(((item) => {
        const date = item[DATE];
        const action = item[ACTION];
        const manager = item[MANAGER];
        const cause = item[CAUSE];

        return (
          <FadeIn key={date}>
            <ExpansionPanel expanded={expanded === date} onChange={handleChange(date)}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography
                  className={expelledOrBanned(action) ? classes.headingBlocked : classes.heading}
                >
                  {action}
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  {date}
                </Typography>
                <Typography className={classes.TrineryHeading}>
                  {manager}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  <Linkify>
                    {cause}
                  </Linkify>
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </FadeIn>
        );
      }))}
    </div>
  );
};

export default Cards;
