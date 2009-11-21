/**
 * jsOAuth JavaScript OAuth Library v@VERSION
 *
 * @preserve Copyright (c) 2009 Rob Griffiths
 * @author Rob Griffiths
 *
 * Date: @DATE
 * Revision: @REV
 */

(function(){
    var window = this, undefined,
        TYPEOF_OBJECT = 'object', 
        TYPEOF_STRING = 'string', 
        TYPEOF_FUNCTION = 'function', 
        TYPEOF_UNDEFINED = 'undefined',
        TYPEOF_NULL = 'null', 
        OBJECT = Object, 
        STRING = String, 
        FUNCTION = Function, 
        UNDEFINED = undefined,
        NULL = null,
        EMPTY_ARRAY = [],
        EMPTY_OBJECT = {},
        EMPTY_STRING = '',
        
        jsOAuth,                        /** @see interface.js */
        Collection,                     /** @see collection.js */
        Uri,                            /** @see uri.js */
        HttpRequest;                    /** @see http.js */
	
