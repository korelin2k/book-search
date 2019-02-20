import * as React from "react";
import API from "../../util/API";
import * as PropTypes from 'prop-types';
import { createStyles, withStyles, Theme, WithStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            padding: 25,
        },
        card: {
            maxWidth: 300,
        },
        cardAction: {
            height: 400,
        },
        media: {
            height: 200,
            width: 300,
            objectFit: 'cover',
        },
        gridList: {
            maxWidth: 1080,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            overflow: 'hidden',
        },
        gridListTile: {
            width: 350,
            height: 450,
        },
        close: {
            padding: theme.spacing.unit / 2,
        },
    });

export interface Props extends WithStyles<typeof styles> { }

interface State {
    books: string[];
    open: boolean;
    error: boolean;
    currentSearch: string;
}

class Search extends React.Component<Props, State> {
    // Initialize this.state.books as an empty array
    public state = {
        books: [],
        open: false,
        error: false,
        currentSearch: ""
    };

    // Add code here to get all books from the database and save them to this.state.books

    public searchBooks() {
        API.searchBooks(this.state.currentSearch).then(result => {
            this.setState({ books: result.data.items });
            console.log(this.state.books);
        })
    }

    public async componentDidMount() {
        const searchString = window.location.pathname.substr(window.location.pathname.lastIndexOf("/") + 1);
        await this.setState({ currentSearch: searchString });
        this.searchBooks();
    }

    public async componentWillReceiveProps(){
        const searchString = window.location.pathname.substr(window.location.pathname.lastIndexOf("/") + 1);
        await this.setState({ currentSearch: searchString });
        this.searchBooks();
     }

    public handleClose = (event: any, reason: any) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };

    public handleError = (event: any, reason: any) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ error: false });
    };

    public render() {
        const { classes } = this.props;

        return (
            <Grid container className={classes.root} alignItems="center" direction="row" justify="center">
                <GridList cellHeight={160} className={classes.gridList} cols={3}>
                    {this.state.books.map((book: any) => (
                        <GridListTile key={book.id} cols={1} rows={3} className={classes.gridListTile}>
                            <Card className={classes.card}>
                                <CardActionArea className={classes.cardAction}>
                                    <CardMedia
                                        className={classes.media}
                                        image={typeof book.volumeInfo.imageLinks !== "undefined" ? book.volumeInfo.imageLinks.thumbnail : ("../images/generic-book.jpg")}
                                        title={book.volumeInfo.title}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="h6">
                                            {book.volumeInfo.title} by {book.volumeInfo.authors}
                                        </Typography>
                                        <Typography component="p">
                                            {typeof book.volumeInfo.description !== "undefined" && book.volumeInfo.description.substring(0, 100)}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary" onClick={() => window.open(book.volumeInfo.infoLink, "_blank")}>
                                        View
                                    </Button>
                                    <Button size="small" color="primary" onClick={() => {
                                        if (typeof book.volumeInfo.imageLinks === "undefined") {
                                            book.volumeInfo.imageLinks = {
                                                thumbnail: "../images/generic-book.jpg",
                                            }
                                        }

                                        API.saveBook({
                                            authors: book.volumeInfo.authors,
                                            description: book.volumeInfo.description,
                                            image: book.volumeInfo.imageLinks.thumbnail,
                                            link: book.volumeInfo.infoLink,
                                            title: book.volumeInfo.title,
                                        }).then(result => {
                                            this.setState({ open: true });
                                        }).catch(error => {
                                            this.setState({ error: true });
                                        })
                                    }}>
                                        Save
                                    </Button>
                                </CardActions>
                            </Card>
                        </GridListTile>
                    ))}
                </GridList>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Book Saved</span>}
                />
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.error}
                    autoHideDuration={6000}
                    onClose={this.handleError}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Book Previously Saved</span>}
                />
            </Grid>
        );
    }
}

(Search as React.ComponentClass<Props>).propTypes = {
    classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(Search);

