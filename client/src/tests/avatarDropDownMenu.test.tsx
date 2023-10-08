import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AvatarDropDownMenu from '../components/AvatarDropDownMenu/AvatarDropDownMenu';

test('renders avatarDropDownMenuwithout errors', () => {
    render(
        <Router>
            <AvatarDropDownMenu />
        </Router>
    );
});

test('renders the "avatar" element when AvatarDropDownMenu is rendered', () => {
    const { queryByTestId } = render(
        <Router>
            <AvatarDropDownMenu />
        </Router>
    );

    const avatar = queryByTestId('avatar');
    expect(avatar).toBeInTheDocument();
});
