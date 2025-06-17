import sqlite3
import json
from pathlib import Path

def migrate_ussd_table():
    """Add temp_data column to existing USSDSession table"""
    db_path = Path("C:/Projects/ChapFarm/backend/app.db")
    
    if not db_path.exists():
        print("Database file not found. Creating new database...")
        return
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    try:
        # Check if temp_data column exists
        cursor.execute("PRAGMA table_info(ussdsession)")
        columns = [column[1] for column in cursor.fetchall()]
        
        if 'temp_data' not in columns:
            print("Adding temp_data column to ussdsession table...")
            cursor.execute("ALTER TABLE ussdsession ADD COLUMN temp_data TEXT")
            print("Column added successfully!")
        else:
            print("temp_data column already exists.")
        
        # Check if last_step column exists
        if 'last_step' not in columns:
            print("Adding last_step column to ussdsession table...")
            cursor.execute("ALTER TABLE ussdsession ADD COLUMN last_step TEXT DEFAULT 'INITIAL'")
            print("last_step column added successfully!")
        else:
            print("last_step column already exists.")
        
        conn.commit()
        print("Migration completed successfully!")
        
    except sqlite3.Error as e:
        print(f"Migration failed: {e}")
        conn.rollback()
    finally:
        conn.close()

if __name__ == "__main__":
    migrate_ussd_table()