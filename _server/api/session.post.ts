/* Import modules. */
import moment from 'moment'
import { sha256 } from '@nexajs/crypto'
import PouchDB from 'pouchdb'
import { v4 as uuidv4 } from 'uuid'

/* Initialize databases. */
const sessionsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/sessions`)

/**
 * Create Session
 *
 * @returns session
 */
const createSession = async (_event) => {
    /* Initialize locals. */
    let challenge
    let headers
    let logDetails
    let session
    let success

    /* Set headers. */
    headers = _event.node.req.headers
    // console.log('HEADERS', headers)

    /* Build log details. */
    logDetails = {
        i18n: headers['accept-language'],
        client: headers['user-agent'],
        referer: headers['referer'],
        host: headers['host'],
        ip: headers['x-real-ip'],
        ip_fwd: headers['x-forwarded-for'],
        url: _event.node.req.url,
    }
    // console.info('LOG (api):', logDetails)

    /* Create new challenge (string). */
    // NOTE: Used for (optional) secure authentication.
    challenge = sha256(uuidv4()).slice(0, 40)

    /* Create (new) session. */
    session = {
        _id: uuidv4(),
        ...logDetails,
        challenge,
        isActive: true,
        createdAt: moment().unix(),
        expiresAt: moment().add(1, 'days').unix(),
        killedAt: moment().add(7, 'days').unix(),
    }

    /* Save session to database. */
    success = await sessionsDb
        .put(session)
        .catch(err => console.error(err))
    // console.log('SUCCESS', success)

    /* Return session. */
    return session
}

export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let body
    let session
    let sessionid
    let success

    /* Set (request) body. */
    body = await readBody(event)
    // console.log('SESSIONS.POST (body):', body)

    /* Set session id. */
    sessionid = body?.sessionid
    // console.log('SESSION ID', sessionid)

    /* Request session (if available). */
    session = await sessionsDb
        .get(sessionid)
        .catch(err => console.error(err))
    // console.log('SESSION (api):', session)

    /* Validate session. */
    if (!session?.isActive) {
        session = await createSession(event)
    } else {
        /* Update timestamp. */
        session = {
            ...session,
            expiresAt: moment().add(1, 'days').unix(),
            updatedAt: moment().unix(),
        }

        /* Save (updated) session. */
        success = await sessionsDb
            .put(session)
            .catch(err => console.error(err))
        // console.log('UPDATE SESSION (api):', success)
    }

    /* Return session. */
    return session
})
