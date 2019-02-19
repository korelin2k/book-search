import * as React from "react";
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = (theme: Theme) =>
    createStyles({
        footer: {
            backgroundColor: "#e3f2fd",
            marginTop: theme.spacing.unit * 8,
            padding: `${theme.spacing.unit * 6}px 0`,
        },
    });

export interface Props extends WithStyles<typeof styles> { }

class PrimaryFooter extends React.Component<Props> {
    public render() {
        const { classes } = this.props;

        return (
            <footer className={classes.footer}>
                <Typography variant="h6" align="center" gutterBottom>
                    Google Books
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    Brought to you by Fignation.
                </Typography>
            </footer>
        );
    }
}

export default withStyles(styles)(PrimaryFooter);