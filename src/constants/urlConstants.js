const BASEURL = "http://localhost:8000/";
const URLCONSTANTS = {
    SET_IDEAS: `${BASEURL}add_concept`,
    UNDERSTANDING: `${BASEURL}understanding`,
    PERSONA: `${BASEURL}understanding/persona`,
    FEATURES: `${BASEURL}understanding/features`,
    GET_CONCEPTS: `${BASEURL}get_concepts`,
    GET_IDEAS: `${BASEURL}get_concept_outputs/`,
    PROCEED: `${BASEURL}proceed_to_next_agent`,
    UPDATE_ENTRY: `${BASEURL}update_entry/`,
    DELETE_ENTRY: `${BASEURL}delete_entry/`,
    PROCEED_TO_NEXT_AGENT: `${BASEURL}proceed_to_next_agent`,
    GET_PARTICULAR_AGENT_RESPONSE: `${BASEURL}get_output/`,
    ADD_FEEDBACK: `${BASEURL}add_feedback`,
    PUBLISHJIRA: `${BASEURL}publish_to_jira/`,
    UPDATE_FEATURE_PRIORITY: `${BASEURL}update_feature_priority`,

}

export { URLCONSTANTS };