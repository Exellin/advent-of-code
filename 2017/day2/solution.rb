require '../read_file.rb'
include ReadFile

spreadsheet = ReadFile.read_by_lines('input.txt')

# Convert the spreadsheet into a 2d array of numbers
spreadsheet.map! do |string|
  string.split(' ').map! { |entry| entry.to_i }
end

# Part 1
# The spreadsheet consists of rows of apparently-random numbers. To make sure the recovery process is on the right track,
# they need you to calculate the spreadsheet's checksum. For each row, determine the difference between the largest value
# and the smallest value; the checksum is the sum of all of these differences.
checksum = 0

spreadsheet.each do |column|
  checksum += column.max - column.min
end

puts checksum

# Part 2
# It sounds like the goal is to find the only two numbers in each row where one evenly divides the other - that is, where
# the result of the division operation is a whole number. They would like you to find those numbers on each line, divide them,
# and add up each line's result.
result = 0;

# Loop through each column, then for each column have each number be compared to every other number in the column
spreadsheet.each do |column|
  found = false # Create a found variable to break out of all loops within a column and prevent excess computations
  column.each do |number1|
    column.each do |number2|
      if ((number1 > number2) && (number1 % number2 == 0))
        result += number1 / number2
        found = true
      elsif ((number2 > number1) && (number2 % number1 == 0))
        result += number2 / number1
        found = true
      end
      break if found
    end
    break if found
  end
end

puts result
