module ReadFile
  def read_file(filename)
    file = open(filename)
    content = file.read.chop # Read file and remove the EOF character
    file.close
    content
  end

  def read_by_lines(filename)
    file = open(filename)
    content = file.readlines
    file.close
    content
  end
end
