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
        }
    });

export interface Props extends WithStyles<typeof styles> { }

interface State {
    books: string[];
}

class Search extends React.Component<Props, State> {
    // Initialize this.state.books as an empty array
    public state = {
        books: [],
    };

    // Add code here to get all books from the database and save them to this.state.books

    public searchBooks() {
        const searchString = window.location.pathname.substr(window.location.pathname.lastIndexOf("/") + 1);
        console.log(searchString);
        API.searchBooks(searchString).then(result => {
            this.setState({ books: result.data.items });
            console.log(this.state.books);
        })
    }

    public componentDidMount() {
        this.searchBooks();
    }

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
                                        image={book.volumeInfo.imageLinks.thumbnail.replace(/http/, "https")}
                                        title={book.volumeInfo.title}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
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
                                    <Button size="small" color="primary" onClick={() =>
                                        API.saveBook({ 
                                            authors: book.volumeInfo.authors,
                                            description: book.volumeInfo.description,
                                            image: book.volumeInfo.imageLinks.thumbnail.replace(/http/, "https"),
                                            link: book.volumeInfo.infoLink,
                                            title: book.volumeInfo.title,
                                        })
                                    }>
                                        Save
                                    </Button>
                                </CardActions>
                            </Card>
                        </GridListTile>
                    ))}
                </GridList>
            </Grid>
        );
    }
}

(Search as React.ComponentClass<Props>).propTypes = {
    classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(Search);

