package org.smartas.devops.generator.db;

/**
 * Typesafe enum of known database dialects.
 *
 * @author Jeff Butler
 */
public enum DatabaseDialects {

    /** The D b2. */
    DB2("VALUES IDENTITY_VAL_LOCAL()"), //$NON-NLS-1$
    /** The mysql. */
 MYSQL("SELECT LAST_INSERT_ID()"), //$NON-NLS-1$
    /** The sqlserver. */
 SQLSERVER("SELECT SCOPE_IDENTITY()"), //$NON-NLS-1$
    /** The cloudscape. */
 CLOUDSCAPE("VALUES IDENTITY_VAL_LOCAL()"), //$NON-NLS-1$
    /** The derby. */
 DERBY("VALUES IDENTITY_VAL_LOCAL()"), //$NON-NLS-1$
    /** The hsqldb. */
 HSQLDB("CALL IDENTITY()"), //$NON-NLS-1$
    /** The sybase. */
 SYBASE("SELECT @@IDENTITY"), //$NON-NLS-1$
    /** The D b2_ mf. */
 DB2_MF("SELECT IDENTITY_VAL_LOCAL() FROM SYSIBM.SYSDUMMY1"), //$NON-NLS-1$
    /** The informix. */
 INFORMIX("select dbinfo('sqlca.sqlerrd1') from systables where tabid=1"); //$NON-NLS-1$

    /** The identity retrieval statement. */
 private String identityRetrievalStatement;

    /**
     * Instantiates a new database dialects.
     *
     * @param identityRetrievalStatement
     *            the identity retrieval statement
     */
    private DatabaseDialects(String identityRetrievalStatement) {
        this.identityRetrievalStatement = identityRetrievalStatement;
    }

    /**
     * Gets the identity retrieval statement.
     *
     * @return the identity retrieval statement
     */
    public String getIdentityRetrievalStatement() {
        return identityRetrievalStatement;
    }

    /**
     * Gets the database dialect.
     *
     * @param database
     *            the database
     * @return the database dialect for the selected database. May return null if there is no known dialect for the
     *         selected db
     */
    public static DatabaseDialects getDatabaseDialect(String database) {
        DatabaseDialects returnValue = null;

        if ("DB2".equalsIgnoreCase(database)) { //$NON-NLS-1$
            returnValue = DB2;
        } else if ("MySQL".equalsIgnoreCase(database)) { //$NON-NLS-1$
            returnValue = MYSQL;
        } else if ("SqlServer".equalsIgnoreCase(database)) { //$NON-NLS-1$
            returnValue = SQLSERVER;
        } else if ("Cloudscape".equalsIgnoreCase(database)) { //$NON-NLS-1$
            returnValue = CLOUDSCAPE;
        } else if ("Derby".equalsIgnoreCase(database)) { //$NON-NLS-1$
            returnValue = DERBY;
        } else if ("HSQLDB".equalsIgnoreCase(database)) { //$NON-NLS-1$
            returnValue = HSQLDB;
        } else if ("SYBASE".equalsIgnoreCase(database)) { //$NON-NLS-1$
            returnValue = SYBASE;
        } else if ("DB2_MF".equalsIgnoreCase(database)) { //$NON-NLS-1$
            returnValue = DB2_MF;
        } else if ("Informix".equalsIgnoreCase(database)) { //$NON-NLS-1$
            returnValue = INFORMIX;
        }

        return returnValue;
    }
}
