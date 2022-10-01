export interface GetIdentityRequest {
    // TODO
}

export interface GetIdentityResponse {
    identity: Identity;
}

export interface Identity {
    id: string;
    created: string;
}
