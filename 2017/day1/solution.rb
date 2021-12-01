require '../read_file.rb'
include ReadFile

captcha = ReadFile.read_file('input.txt')

# Part 1
# The captcha requires you to review a sequence of digits (your puzzle input) and find the sum of all digits that
# match the next digit in the list. The list is circular, so the digit after the last digit is the first digit in the list
def decodeAdjacent(input)
  last_digit = input[-1] # Get last digit of input to make circular
  sum = 0

  input.chars do |char|
    sum += char.to_i if last_digit == char
    last_digit = char
  end
  sum
end

puts decodeAdjacent(captcha)

# Part 2
# Now, instead of considering the next digit, it wants you to consider the digit halfway around the circular list.
# That is, if your list contains 10 items, only include a digit in your sum if the digit 10/2 = 5 steps forward matches it.
# Fortunately, your list has an even number of elements.
def decodeHalfway(input)
  sum = 0

  # Only have to loop through half the array since the numbers are being compared halfway around
  # Multiply each matching character by 2 to compensate for not looping through its pair
  input.chars[0..input.length/2 - 1].each_with_index do |char, i|
    sum += 2*char.to_i if char == input[i + input.length/2]
  end
  sum
end

puts decodeHalfway(captcha)
