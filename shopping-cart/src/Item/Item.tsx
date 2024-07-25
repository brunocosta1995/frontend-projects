import Button from '@mui/material/Button';
//types
import { CartItemType } from '../App';
//styles
import {Wrapper} from './Item.styles';

type Props = {
    item: CartItemType;
    handleAddToCart: (clickedItem: CartItemType) => void;
}

function Item({item, handleAddToCart}: Props): React.ReactElement {
    return(
        <Wrapper>
            <img src={item.image} alt={item.description}/>
            <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <h3>${item.price}</h3>
            </div>
            <Button onClick={() => handleAddToCart(item)}>Add to cart</Button>
        </Wrapper>
    )
}

export default Item;