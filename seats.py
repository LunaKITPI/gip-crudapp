llr_rows = list(range(1, 11))
guest_rows = list(range(11, 21))
total_seats = 35

# Function to generate insert statements
def genInsLines():
    Lines = []
    
    # For rows 1 to 10
    for row in llr_rows:
        for seat in range(1, total_seats + 1):
            Lines.append(f"INSERT INTO tblzit_plaatsen (zitplaats_id, bezet, beziter_id, type) VALUES ({row}.{seat}, 0, '', 2);")
    
    # For rows 11 to 20
    for row in guest_rows:
        for seat in range(1, total_seats + 1):
            Lines.append(f"INSERT INTO tblzit_plaatsen (zitplaats_id, bezet, beziter_id, type) VALUES ({row}.{seat}, 0, '', 1);")
    
    return Lines

# Generate and print the statements
Lines = genInsLines()
for line in Lines:
    print(line)
