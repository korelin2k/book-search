import * as React from 'react';
import * as PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Grid from "@material-ui/core/Grid";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Link from '@material-ui/core/Link';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { Redirect, Link as RouterLink } from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';

const styles = (theme: Theme) =>
    createStyles({
        appbar: {
            backgroundColor: "#2196f3",
        },
        newJumbo: {
            backgroundColor: "#e3f2fd",
            padding: "25px",
        },
        root: {
            width: '100%',
        },
        menuButton: {
            marginLeft: -12,
            marginRight: 20,
        },
        title: {
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
            fontSize: "24px",
        },
        saved: {
            margin: theme.spacing.unit,
            color: "white",
            fontSize: "18px",
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginRight: theme.spacing.unit * 2,
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing.unit * 3,
                width: 'auto',
            },
            flexGrow: 1,
        },
        searchIcon: {
            width: theme.spacing.unit * 9,
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
            width: '100%',
        },
        inputInput: {
            paddingTop: theme.spacing.unit,
            paddingRight: theme.spacing.unit,
            paddingBottom: theme.spacing.unit,
            paddingLeft: theme.spacing.unit * 10,
            transition: theme.transitions.create('width'),
            width: '100%',
        },
    });

export interface Props extends WithStyles<typeof styles> { }

interface State {
    anchorEl: null | HTMLElement;
    mobileMoreAnchorEl: null | HTMLElement;
    fireRedirect: boolean | HTMLElement;
    searchString: string | HTMLElement;
    fullSearchString: string | HTMLElement;
}

class PrimarySearchAppBar extends React.Component<Props, State> {
    public state: State = {
        anchorEl: null,
        mobileMoreAnchorEl: null,
        fireRedirect: false,
        searchString: "",
        fullSearchString: "",
    };

    public handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.setState({ fireRedirect: true });
        this.setState({ fullSearchString: this.state.searchString});
        this.setState({ searchString: ""});
    }

    public handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        this.setState({ searchString: value });
    }

    public handleRedirect = () => {
        const searchString = this.state.fullSearchString.toString().replace(/ /g,"+");

        if (this.state.fireRedirect && (window.location.pathname !== `/search/${searchString}`)) {         
            return <Redirect to={`/search/${searchString}`} />;
        } else {
            return "";
        }
    }

    public resetAllState = () => {
        this.setState({ fireRedirect: false });
        this.setState({ searchString: "" });
    }

    public render() {
        const { classes } = this.props;

        const mySaved = () => <RouterLink to="/saved" className={classes.saved} onClick={this.resetAllState}>Saved</RouterLink>;

        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.appbar}>
                    <Toolbar>
                        <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                            Google Books |
                            <Link component={mySaved}>
                                Saved
                            </Link>
                        </Typography>
                        <div className={classes.search}>
                            <form onSubmit={this.handleSubmit}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder="Search for new books…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    value={this.state.searchString}
                                    name="searchString"
                                    fullWidth={true}
                                    onChange={this.handleInputChange}
                                />
                            </form>
                            {this.handleRedirect()}
                        </div>
                    </Toolbar>
                </AppBar>
                <Grid className={classes.newJumbo}>
                    <Typography variant="h2" align="center" gutterBottom>
                        (React) Google Books Search
                    </Typography>
                    <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                        Search for and Save Books of Interest
                    </Typography>
                </Grid>
            </div>
        );
    }
}

(PrimarySearchAppBar as React.ComponentClass<Props>).propTypes = {
    classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(PrimarySearchAppBar);