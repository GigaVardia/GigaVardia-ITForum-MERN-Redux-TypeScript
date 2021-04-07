import * as MainInfoCreators from './MainInfoActions'
import * as AuthenticationCreators from './AuthenticationActions'

// eslint-disable-next-line
const Actions = {
    ...MainInfoCreators,
    ...AuthenticationCreators

}

export default Actions